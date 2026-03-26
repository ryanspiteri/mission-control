// Property Finder — Elara Voss / Ryan Spiteri
var PROP_DEALS = [];
var PROP_EMAIL_IDS = [];
var PROP_DRAFTS = {};
var propSortCol = null;
var propSortDir = 1;

// Load data
Promise.all([
  fetch('prop-data.json').then(function(r){ return r.json(); }),
  fetch('prop-drafts.json').then(function(r){ return r.json(); })
]).then(function(results) {
  var data = results[0];
  PROP_DRAFTS = results[1];
  PROP_DEALS = data.deals || [];
  PROP_EMAIL_IDS = data.emailIds || [];
  initProp();
}).catch(function(e) {
  console.warn('prop data load failed:', e);
  initProp();
});

function initProp() {
  var sel = document.getElementById('pf-suburb');
  if (!sel) return;
  var suburbs = [];
  var seen = {};
  for (var i = 0; i < PROP_DEALS.length; i++) {
    var s = PROP_DEALS[i].suburb;
    if (s && !seen[s]) { seen[s] = true; suburbs.push(s); }
  }
  suburbs.sort();
  for (var j = 0; j < suburbs.length; j++) {
    var o = document.createElement('option');
    o.value = suburbs[j];
    o.textContent = suburbs[j];
    sel.appendChild(o);
  }
  var ids = ['pf-suburb','pf-beds','pf-days','pf-price','pf-draft','pf-yield','pf-rating'];
  for (var k = 0; k < ids.length; k++) {
    var el = document.getElementById(ids[k]);
    if (el) el.addEventListener('change', propApply);
  }
  propApply();
}

function propGetFilters() {
  function v(id) { var el = document.getElementById(id); return el ? el.value : ''; }
  return {
    suburb: v('pf-suburb'),
    beds: v('pf-beds'),
    days: v('pf-days'),
    price: v('pf-price'),
    draft: v('pf-draft'),
    yield_min: v('pf-yield'),
    rating: v('pf-rating')
  };
}

function propApply() {
  var f = propGetFilters();
  var filtered = [];
  for (var i = 0; i < PROP_DEALS.length; i++) {
    var d = PROP_DEALS[i];
    if (f.suburb && d.suburb !== f.suburb) continue;
    if (f.beds) { var b = parseInt(d.bedrooms); if (isNaN(b) || b < parseInt(f.beds)) continue; }
    if (f.days && (d.days_on_market||0) < parseInt(f.days)) continue;
    if (f.price && d.price > 0 && d.price > parseInt(f.price)) continue;
    if (f.draft === 'yes' && PROP_EMAIL_IDS.indexOf(String(d.id)) === -1) continue;
    if (f.yield_min) { var y = d.gross_yield||0; if (y <= 0 || y > 15 || y < parseFloat(f.yield_min)) continue; }
    if (f.rating) {
      var stars = (d.investment_stars||'').length;
      if (f.rating === '5' && stars < 5) continue;
      if (f.rating === '4' && stars < 4) continue;
      if (f.rating === '3' && stars < 3) continue;
    }
    filtered.push(d);
  }
  if (propSortCol) {
    filtered.sort(function(a, b) {
      var va, vb;
      if (propSortCol === 'offer') { va = a.offer||0; vb = b.offer||0; }
      else if (propSortCol === 'yield') { va = a.gross_yield||0; vb = b.gross_yield||0; }
      else if (propSortCol === 'rent') { va = a.rent_pw||0; vb = b.rent_pw||0; }
      else if (propSortCol === 'cashflow') { va = a.cashflow_pw||0; vb = b.cashflow_pw||0; }
      else if (propSortCol === 'growth') { va = a.suburb_growth_12m||0; vb = b.suburb_growth_12m||0; }
      else { va = a[propSortCol]||0; vb = b[propSortCol]||0; }
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      return va < vb ? -propSortDir : va > vb ? propSortDir : 0;
    });
  }
  propRenderTable(filtered);
  propUpdateStats(filtered);
}

function propSort(col, th) {
  if (propSortCol === col) propSortDir *= -1;
  else { propSortCol = col; propSortDir = 1; }
  var ths = document.querySelectorAll('.prop-table thead th');
  for (var i = 0; i < ths.length; i++) ths[i].classList.remove('prop-sorted');
  th.classList.add('prop-sorted');
  propApply();
}

function propRenderTable(deals) {
  var tbody = document.getElementById('prop-tbody');
  if (!tbody) return;
  document.getElementById('prop-result-count').textContent = deals.length;
  document.getElementById('prop-no-results').style.display = deals.length ? 'none' : 'block';
  if (!deals.length) { tbody.innerHTML = ''; return; }
  var rows = [];
  for (var i = 0; i < deals.length; i++) {
    var d = deals[i];
    var days = d.days_on_market||0;
    var price = d.price||0;
    var offer = d.offer||0;
    var offerStr = offer > 0 ? '$'+offer.toLocaleString() : (price > 0 ? '$'+Math.floor(price*0.88).toLocaleString() : 'POA');
    var hasDraft = PROP_EMAIL_IDS.indexOf(String(d.id)) !== -1;
    var dayBadge = days >= 60 ? '<span class="prop-badge hot">'+days+'d</span>' :
                   days >= 30 ? '<span class="prop-badge warm">'+days+'d</span>' :
                   '<span class="prop-badge new">'+days+'d</span>';
    var addr = d.url ? '<a href="'+d.url+'" target="_blank" style="color:var(--text);text-decoration:none;font-weight:500">'+d.address+'</a>' :
               '<span style="font-weight:500">'+d.address+'</span>';
    var beds = (d.bedrooms && d.bedrooms !== '?') ? d.bedrooms+'bd' : '&mdash;';
    var gy = d.gross_yield||0;
    var validY = gy > 0 && gy <= 15;
    var yColor = gy >= 5 ? 'var(--green)' : gy >= 4.5 ? '#22c55e' : gy >= 4 ? '#f59e0b' : 'var(--text2)';
    var yStr = validY ? '<span style="color:'+yColor+';font-weight:700">'+gy.toFixed(2)+'%</span>' :
               '<span style="color:var(--text2);font-size:10px">est.</span>';
    var rentStr = d.rent_pw ? '$'+d.rent_pw+'/wk' : '&mdash;';
    var cfStr = '&mdash;';
    if (d.cashflow_pw && price > 0) {
      var c = d.cashflow_pw;
      var cfColor = c >= 0 ? 'var(--green)' : '#ef4444';
      cfStr = '<span style="color:'+cfColor+';font-weight:600">'+(c >= 0 ? '+' : '')+'$'+c+'/wk</span>';
    }
    var gr = d.suburb_growth_12m||0;
    var grColor = gr >= 7 ? 'var(--green)' : gr >= 5 ? '#f59e0b' : 'var(--text2)';
    var grStr = '<span style="color:'+grColor+'">'+gr+'%/yr</span>';
    var vmp = d.vs_median_pct||0;
    var vmColor = vmp < -10 ? 'var(--green)' : vmp > 10 ? '#ef4444' : 'var(--text2)';
    var vmStr = price > 0 ? '<span style="color:'+vmColor+';font-size:10px">'+(d.vs_median_label||'')+'</span>' : '&mdash;';
    var sdStr = d.stamp_duty > 0 ? '$'+d.stamp_duty.toLocaleString() : '&mdash;';
    var repStr = d.weekly_repayment > 0 ? '$'+d.weekly_repayment+'/wk' : '&mdash;';
    var sStr = d.investment_stars ? '<span title="'+(d.investment_rating||'')+'" style="font-size:11px">'+d.investment_stars+'</span>' : '&mdash;';
    var safeId = encodeURIComponent(String(d.id));
    var dBtn = hasDraft ?
      '<button class="prop-draft-btn" onclick="propOpenDraft(decodeURIComponent(\''+safeId+'\'))">Draft</button>' :
      '<span style="color:var(--text2);font-size:11px">&mdash;</span>';
    rows.push('<tr>'+
      '<td>'+addr+'</td>'+
      '<td style="color:var(--text2);font-size:11px">'+(d.suburb||'&mdash;')+'</td>'+
      '<td style="text-align:center;font-size:11px">'+beds+'</td>'+
      '<td style="font-weight:600">'+(d.price_display||'POA')+'</td>'+
      '<td style="text-align:center">'+dayBadge+'</td>'+
      '<td style="text-align:center">'+yStr+'</td>'+
      '<td style="text-align:center;font-size:11px">'+rentStr+'</td>'+
      '<td style="text-align:center">'+cfStr+'</td>'+
      '<td style="text-align:center;font-size:11px">'+grStr+'</td>'+
      '<td style="text-align:center;font-size:10px">'+vmStr+'</td>'+
      '<td style="text-align:center;font-size:11px">'+sdStr+'</td>'+
      '<td style="text-align:center;font-size:11px">'+repStr+'</td>'+
      '<td style="text-align:center">'+sStr+'</td>'+
      '<td style="font-weight:700;color:var(--green)">'+offerStr+'</td>'+
      '<td>'+dBtn+'</td>'+
      '</tr>');
  }
  tbody.innerHTML = rows.join('');
}

function propUpdateStats(filtered) {
  var hot = 0, hy = 0, emails = 0;
  for (var i = 0; i < filtered.length; i++) {
    var d = filtered[i];
    if ((d.days_on_market||0) >= 60) hot++;
    if (d.gross_yield >= 4.5 && d.gross_yield <= 15) hy++;
    if (PROP_EMAIL_IDS.indexOf(String(d.id)) !== -1) emails++;
  }
  document.getElementById('prop-stat-total').textContent = filtered.length;
  document.getElementById('prop-stat-hot').textContent = hot;
  document.getElementById('prop-stat-warm').textContent = hy;
  document.getElementById('prop-stat-emails').textContent = emails;
  var wl = document.getElementById('prop-stat-warm-label');
  if (wl) wl.textContent = 'Yield 4.5%+';
  var sub = document.getElementById('prop-header-sub');
  if (sub) sub.textContent = 'Gold Coast | $600K\u20132M | '+PROP_DEALS.length+' listings';
}

function propParseDraft(full) {
  var meta = [], email = '', brief = '', agent = '', section = 'meta';
  var lines = full.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (/SECTION 1|EMAIL TO AGENT/i.test(line)) { section = 'email'; continue; }
    if (/SECTION 2|ELARA/i.test(line)) { section = 'brief'; continue; }
    if (/SECTION 3|AGENT PROFILE/i.test(line)) { section = 'agent'; continue; }
    if (/^---+|^###/.test(line)) continue;
    if (/^(PROPERTY|ASKING|OUR OFFER|DAYS ON MARKET|AGENT):/.test(line)) { meta.push(line); continue; }
    if (/^={3,}/.test(line)) continue;
    if (section === 'email') email += line + '\n';
    else if (section === 'brief') brief += line + '\n';
    else if (section === 'agent') agent += line + '\n';
  }
  if (!email.trim()) email = full;
  return { meta: meta, email: email.trim(), brief: brief.trim(), agent: agent.trim() };
}

function propOpenDraft(id) {
  var full = PROP_DRAFTS[id] || 'Draft not found.';
  var parsed = propParseDraft(full);
  var d = null;
  for (var i = 0; i < PROP_DEALS.length; i++) {
    if (String(PROP_DEALS[i].id) === String(id)) { d = PROP_DEALS[i]; break; }
  }
  document.getElementById('prop-modal-title').textContent = 'Offer Draft';
  document.getElementById('prop-modal-sub').textContent = (d ? d.address : id) + (d && d.price_display ? ' \u2014 ' + d.price_display : '');
  var metaEl = document.getElementById('prop-modal-meta');
  if (parsed.meta.length) {
    metaEl.innerHTML = parsed.meta.map(function(l) {
      var idx = l.indexOf(':');
      return '<strong>' + l.slice(0, idx) + ':</strong> ' + l.slice(idx+1).trim();
    }).join(' &nbsp;&middot;&nbsp; ');
    metaEl.style.display = 'block';
  } else { metaEl.style.display = 'none'; }
  var briefEl = document.getElementById('prop-modal-brief');
  if (parsed.brief) {
    document.getElementById('prop-brief-content').innerHTML = parsed.brief
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .split('\n').join('<br>');
    briefEl.style.display = 'block';
  } else { briefEl.style.display = 'none'; }
  var agentEl = document.getElementById('prop-modal-agent');
  if (parsed.agent) {
    document.getElementById('prop-agent-content').innerHTML = parsed.agent
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .split('\n').join('<br>');
    agentEl.style.display = 'block';
  } else { agentEl.style.display = 'none'; }
  document.getElementById('prop-modal-email').textContent = parsed.email;
  document.getElementById('prop-modal-overlay').classList.add('active');
}

function propCloseModal(e) {
  if (e.target === document.getElementById('prop-modal-overlay')) propCloseModalDirect();
}
function propCloseModalDirect() {
  document.getElementById('prop-modal-overlay').classList.remove('active');
}
function propCopyEmail() {
  var text = document.getElementById('prop-modal-email').textContent;
  navigator.clipboard.writeText(text).then(function() {
    var btn = document.querySelector('.prop-btn-copy');
    btn.textContent = 'Copied!';
    setTimeout(function() { btn.textContent = 'Copy Email'; }, 2000);
  });
}
function propReset() {
  var ids = ['pf-suburb','pf-beds','pf-days','pf-price','pf-draft','pf-yield','pf-rating'];
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(ids[i]);
    if (el) el.value = '';
  }
  propSortCol = null;
  propSortDir = 1;
  propApply();
}

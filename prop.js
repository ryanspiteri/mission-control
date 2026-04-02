// Property Finder — auto-generated 2026-04-02 21:23
var PROP_DEALS = [
  {
    "url": "https://www.domain.com.au/24-62-66-brown-street-labrador-qld-4215-2020628543",
    "address": "24/62-66 Brown Street, Labrador QLD 4215",
    "price": "Offers Over $900,000",
    "beds": 3,
    "baths": 1,
    "days": 0,
    "type": "Townhouse"
  },
  {
    "url": "https://www.domain.com.au/9-ragamuffin-drive-west-coomera-waters-qld-4209-2020733053",
    "address": "9 Ragamuffin Drive West, Coomera Waters QLD 4209",
    "price": "Offers Over $1,550,000",
    "beds": 4,
    "baths": 2,
    "days": 0,
    "type": "House"
  },
  {
    "url": "https://www.domain.com.au/208-641-pine-ridge-road-biggera-waters-qld-4216-2020726377",
    "address": "208/641 Pine Ridge Road, Biggera Waters QLD 4216",
    "price": "Offers Over $790,000",
    "beds": 3,
    "baths": 1,
    "days": 0,
    "type": "Townhouse"
  },
  {
    "url": "https://www.domain.com.au/25-43-myola-court-coombabah-qld-4216-2020726463",
    "address": "25/43 Myola Court, Coombabah QLD 4216",
    "price": "1,050,000+",
    "beds": 3,
    "baths": 2,
    "days": 0,
    "type": "Townhouse"
  },
  {
    "url": "https://www.domain.com.au/10-mackenzie-street-coomera-qld-4209-2020727657",
    "address": "10 Mackenzie Street, Coomera QLD 4209",
    "price": "Vacant & Move In Ready | Offers Over $1,099,000+",
    "beds": 4,
    "baths": 2,
    "days": 0,
    "type": "House"
  },
  {
    "url": "https://www.domain.com.au/21-binalong-drive-ashmore-qld-4214-2020728332",
    "address": "21 Binalong Drive, Ashmore QLD 4214",
    "price": "Offers Over $1,395,000",
    "beds": 3,
    "baths": 2,
    "days": 0,
    "type": "House"
  },
  {
    "url": "https://www.domain.com.au/30-studio-drive-oxenford-qld-4210-2020721586",
    "address": "30 Studio Drive, Oxenford QLD 4210",
    "price": "Pool & Dual Street Access! Offers Over $1,179,000",
    "beds": 4,
    "baths": 1,
    "days": 0,
    "type": "House"
  },
  {
    "url": "https://www.domain.com.au/57-flora-terrace-pimpama-qld-4209-2020723569",
    "address": "57 Flora Terrace, Pimpama QLD 4209",
    "price": "Offers Over $950,000",
    "beds": 4,
    "baths": 2,
    "days": 0,
    "type": "House"
  },
  {
    "url": "https://www.domain.com.au/4-14-victor-avenue-paradise-point-qld-4216-2020462373",
    "address": "4/14 Victor Avenue, Paradise Point QLD 4216",
    "price": "$1,390,000 LAST REMAINING",
    "beds": 3,
    "baths": 2,
    "days": 0,
    "type": "Villa"
  },
  {
    "url": "https://www.domain.com.au/73-girtin-circuit-pimpama-qld-4209-2020648188",
    "address": "73 Girtin Circuit, Pimpama QLD 4209",
    "price": "Offers Over $1,250,000",
    "beds": 4,
    "baths": 2,
    "days": 0,
    "type": "House"
  },
  {
    "url": "https://www.domain.com.au/145-125-santa-cruz-boulevard-clear-island-waters-qld-4226-2020682537",
    "address": "145/125 Santa Cruz Boulevard, Clear Island Waters QLD 4226",
    "price": "$1,475,000 plus",
    "beds": 3,
    "baths": 2,
    "days": 0,
    "type": "Townhouse"
  },
  {
    "url": "https://www.domain.com.au/57-1-residences-circuit-pimpama-qld-4209-2020716301",
    "address": "57/1 Residences Circuit, Pimpama QLD 4209",
    "price": "Asking Over $900,000",
    "beds": 3,
    "baths": 2,
    "days": 0,
    "type": "House"
  },
  {
    "url": "https://www.domain.com.au/tugun-1-pendraat-parade-hope-island-qld-4212-2018399356",
    "address": "Tugun/1 Pendraat Parade, Hope Island QLD 4212",
    "price": "$1,090,000",
    "beds": 3,
    "baths": 2,
    "days": 0,
    "type": "Unknown"
  },
  {
    "url": "https://www.domain.com.au/pelican-1-pendraat-parade-hope-island-qld-4212-2019328017",
    "address": "Pelican//1 Pendraat Parade, Hope Island QLD 4212",
    "price": "$975,000",
    "beds": 3,
    "baths": 2,
    "days": 0,
    "type": "Unknown"
  },
  {
    "url": "https://www.domain.com.au/2-12-goldwyn-way-oxenford-qld-4210-2020709483",
    "address": "2/12 Goldwyn Way, Oxenford QLD 4210",
    "price": "Offers Over $875,000",
    "beds": 3,
    "baths": 1,
    "days": 0,
    "type": "House"
  }
];

function initProp() {
  var deals = PROP_DEALS;
  var tbody = document.getElementById('prop-tbody');
  if (!tbody || !deals || !deals.length) {
    var nr = document.getElementById('prop-no-results');
    if (nr) nr.style.display = '';
    return;
  }

  // Stats
  var el = function(id) { return document.getElementById(id); };
  if (el('prop-stat-total')) el('prop-stat-total').textContent = deals.length;
  if (el('prop-stat-hot')) el('prop-stat-hot').textContent = deals.filter(function(d) { return (d.days||0) >= 60; }).length;
  if (el('prop-result-count')) el('prop-result-count').textContent = deals.length;
  if (el('prop-header-sub')) el('prop-header-sub').textContent = 'Gold Coast & Brisbane | $600K–$1.5M | ' + deals.length + ' listings found';

  // Populate suburb filter
  var subSel = el('pf-suburb');
  if (subSel) {
    var suburbs = [];
    deals.forEach(function(d) {
      var parts = (d.address||'').split(',');
      var s = parts.length > 1 ? parts[parts.length-2].trim() : '';
      if (s && suburbs.indexOf(s) === -1) suburbs.push(s);
    });
    suburbs.sort().forEach(function(s) {
      var o = document.createElement('option');
      o.value = s; o.textContent = s;
      subSel.appendChild(o);
    });
  }

  // Render rows matching the 15-column table structure
  tbody.innerHTML = deals.map(function(d) {
    var priceNum = 0;
    var pm = (d.price||'').match(/[\d,]+/g);
    if (pm) priceNum = parseInt(pm[0].replace(/,/g,'')) || 0;
    
    var weeklyRent = priceNum > 500000 ? Math.round(priceNum * 0.042 / 52) : 0;
    var yieldPct = priceNum > 0 ? (weeklyRent * 52 / priceNum * 100).toFixed(1) : '';
    var cashflow = weeklyRent > 0 ? Math.round(weeklyRent - (priceNum * 0.06 / 52)) : 0;
    
    var suburb = '';
    var parts = (d.address||'').split(',');
    if (parts.length > 1) suburb = parts[parts.length-2].trim();
    
    var daysLabel = (d.days||0) > 0 ? d.days + 'd' : '—';
    var hotStyle = (d.days||0) >= 60 ? 'color:#ef4444;font-weight:700' : '';
    
    var stamp = priceNum > 0 ? '$' + Math.round(priceNum * 0.035 / 1000) + 'K' : '—';
    var repay = priceNum > 0 ? '$' + Math.round(priceNum * 0.8 * 0.065 / 52) + '/wk' : '—';
    
    return '<tr onclick="window.open(\'' + d.url + '\',\'_blank\')" style="cursor:pointer">' +
      '<td>' + (d.address||'—') + '</td>' +
      '<td>' + suburb + '</td>' +
      '<td>' + (d.beds||'?') + 'b ' + (d.baths||'?') + 'ba</td>' +
      '<td style="color:#22c55e;font-weight:600">' + (d.price||'—') + '</td>' +
      '<td style="' + hotStyle + '">' + daysLabel + '</td>' +
      '<td>' + (yieldPct ? yieldPct + '%' : '—') + '</td>' +
      '<td>' + (weeklyRent ? '$' + weeklyRent : '—') + '</td>' +
      '<td>' + (cashflow > 0 ? '+$' + cashflow + '/wk' : cashflow < 0 ? '-$' + Math.abs(cashflow) + '/wk' : '—') + '</td>' +
      '<td>—</td>' +
      '<td>—</td>' +
      '<td>' + stamp + '</td>' +
      '<td>' + repay + '</td>' +
      '<td>—</td>' +
      '<td><a href="' + d.url + '" target="_blank" onclick="event.stopPropagation()" style="color:#3b82f6;font-size:11px">View</a></td>' +
      '<td>—</td>' +
    '</tr>';
  }).join('');
  
  if (el('prop-no-results')) el('prop-no-results').style.display = 'none';
}

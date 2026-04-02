// Property Finder — auto-generated 2026-04-02 21:20
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
  if (!tbody) return;
  
  // Update stats
  var total = document.getElementById('prop-stat-total');
  var hot = document.getElementById('prop-stat-hot');
  if (total) total.textContent = deals.length;
  if (hot) hot.textContent = deals.filter(function(d) { return d.days >= 60; }).length;
  
  // Update header
  var sub = document.getElementById('prop-header-sub');
  if (sub) sub.textContent = 'Gold Coast | $600K–$1.5M | ' + deals.length + ' listings';
  
  // Update result count
  var rc = document.getElementById('prop-result-count');
  if (rc) rc.textContent = deals.length;
  
  // Populate suburb filter
  var suburbSel = document.getElementById('pf-suburb');
  if (suburbSel) {
    var suburbs = [...new Set(deals.map(function(d) { return d.address.split(',').slice(-2,-1)[0] || ''; }).filter(Boolean))].sort();
    suburbs.forEach(function(s) {
      var opt = document.createElement('option');
      opt.value = s.trim();
      opt.textContent = s.trim();
      suburbSel.appendChild(opt);
    });
  }
  
  // Render rows
  tbody.innerHTML = deals.map(function(d) {
    var priceNum = parseInt((d.price.match(/[\d,]+/) || ['0'])[0].replace(/,/g,'')) || 0;
    var weeklyRent = priceNum > 0 ? Math.round(priceNum * 0.04 / 52) : 0;
    var yieldPct = priceNum > 0 ? (weeklyRent * 52 / priceNum * 100).toFixed(1) : '—';
    var hotBadge = d.days >= 60 ? '<span style="background:#ef444420;color:#ef4444;padding:1px 6px;border-radius:4px;font-size:10px;margin-left:4px">' + d.days + 'd</span>' : '';
    return '<tr onclick="window.open(\'' + d.url + '\', \'_blank\')" style="cursor:pointer">' +
      '<td>' + (d.address || 'Unknown') + hotBadge + '</td>' +
      '<td style="color:#22c55e;font-weight:600">' + (d.price || '—') + '</td>' +
      '<td>' + (d.beds || '?') + 'b ' + (d.baths || '?') + 'ba</td>' +
      '<td>' + (d.type || '—') + '</td>' +
      '<td>' + (weeklyRent ? '$' + weeklyRent + '/wk' : '—') + '</td>' +
      '<td>' + yieldPct + (yieldPct !== '—' ? '%' : '') + '</td>' +
      '<td>' + (d.days > 0 ? d.days + 'd' : '—') + '</td>' +
      '<td><a href="' + d.url + '" target="_blank" style="color:#3b82f6;font-size:11px">View →</a></td>' +
    '</tr>';
  }).join('');
  
  document.getElementById('prop-no-results').style.display = deals.length ? 'none' : 'block';
}

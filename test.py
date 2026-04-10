#!/usr/bin/env python3
"""
Mission Control Pre-Push Test
Run this BEFORE every git push to mission-control.
If any test fails, the push is blocked.
"""

import subprocess, sys, time, os
from playwright.sync_api import sync_playwright

PASS = "✅"
FAIL = "❌"
results = []

def test(name, passed, detail=""):
    status = PASS if passed else FAIL
    results.append((name, passed, detail))
    print(f"{status} {name}" + (f" — {detail}" if detail else ""))
    return passed

def run_tests():
    print("\n=== Mission Control Pre-Push Tests ===\n")
    
    # Test 1: JS syntax check
    r = subprocess.run(['node', '--check', '/tmp/mission-control/prop.js'], capture_output=True, text=True)
    test("prop.js JS syntax", r.returncode == 0, r.stderr[:100] if r.returncode != 0 else "")
    
    # Test 2: prop.js has PROP_DEALS data
    with open('/tmp/mission-control/prop.js') as f:
        prop_content = f.read()
    
    import json, re
    match = re.search(r'var PROP_DEALS = (\[.*?\]);', prop_content, re.DOTALL)
    deals = json.loads(match.group(1)) if match else []
    test("prop.js has listings", len(deals) > 0, f"{len(deals)} deals found")
    
    # Test 3: All deals have required fields
    required = ['url', 'address', 'price', 'brief', 'email']
    complete = all(all(d.get(f) for f in required) for d in deals)
    test("All deals have required fields", complete, f"url/address/price/brief/email")
    
    # Test 4: initProp function exists
    test("initProp function exists", 'function initProp()' in prop_content)
    test("propOpenModal function exists", 'function propOpenModal' in prop_content)
    test("propFilter function exists", 'function propFilter' in prop_content)
    test("BODY.PEEK rule respected (no RFC822)", 'RFC822' not in prop_content, "no RFC822 in prop.js")
    
    # Test 5: index.html checks
    with open('/tmp/mission-control/index.html') as f:
        html = f.read()
    
    test("prop-tbody exists in HTML", 'id="prop-tbody"' in html)
    test("prop-modal-overlay exists", 'id="prop-modal-overlay"' in html)
    test("prop-brief-content exists", 'id="prop-brief-content"' in html)
    test("prop-modal-email exists", 'id="prop-modal-email"' in html)
    test("prop.js script tag present", '<script src="prop.js">' in html)
    test("No RFC822 in index.html", 'RFC822' not in html)
    
    # Test 6: Live browser test
    print("\n--- Browser Tests ---")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        # Load from file
        page = browser.new_page()
        page.goto(f"file:///tmp/mission-control/index.html#property", timeout=15000)
        time.sleep(3)
        
        # Navigate to property page
        page.evaluate("navigate('property', null)")
        time.sleep(2)
        
        # Check table rendered
        rows = page.query_selector_all('#prop-tbody tr')
        test("Property table renders rows", len(rows) > 0, f"{len(rows)} rows")
        
        # Check stats populated
        total_el = page.query_selector('#prop-stat-total')
        total_val = total_el.text_content() if total_el else '0'
        test("Total listings stat shows", total_val not in ['—', '', '0'], f"Shows: {total_val}")
        
        # Check modal opens
        draft_btns = page.query_selector_all('button:has-text("Draft"), td:has-text("$")')
        if draft_btns:
            # Find a Draft button specifically
            all_btns = page.evaluate("() => Array.from(document.querySelectorAll('button')).filter(b => b.textContent.trim() === 'Draft').length")
            test("Draft buttons present", all_btns > 0, f"{all_btns} Draft buttons")
        
        # Check no JS console errors
        js_errors = []
        page.on('console', lambda msg: js_errors.append(msg.text) if msg.type == 'error' else None)
        time.sleep(1)
        test("No JS console errors", len(js_errors) == 0, '; '.join(js_errors[:2]) if js_errors else "")
        
        # Screenshot
        page.screenshot(path='/tmp/mission-control/test-screenshot.png')
        print(f"\n📸 Screenshot: /tmp/mission-control/test-screenshot.png")
        
        browser.close()
    
    # Summary
    print("\n=== Summary ===")
    passed = sum(1 for _, p, _ in results if p)
    failed = sum(1 for _, p, _ in results if not p)
    print(f"{PASS} {passed} passed | {FAIL} {failed} failed")
    
    if failed > 0:
        print("\nFAILED TESTS:")
        for name, p, detail in results:
            if not p:
                print(f"  {FAIL} {name}" + (f": {detail}" if detail else ""))
        print("\n🚫 PUSH BLOCKED — fix failures before pushing")
        return False
    else:
        print("\n✅ All tests passed — safe to push")
        return True

if __name__ == "__main__":
    ok = run_tests()
    sys.exit(0 if ok else 1)

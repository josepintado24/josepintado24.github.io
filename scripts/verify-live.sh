#!/usr/bin/env bash
# verify-live.sh — read-only live URL check for the portfolio
set -uo pipefail

URLS=(
  "https://josepintado24.github.io/"
  "https://josepintado24.github.io/es/"
  "https://josepintado24.github.io/en/"
  "https://josepintado24.github.io/es/case-studies/movistar/"
  "https://josepintado24.github.io/es/case-studies/crepier/"
  "https://josepintado24.github.io/es/case-studies/radioshack/"
  "https://josepintado24.github.io/es/case-studies/desly/"
  "https://josepintado24.github.io/es/case-studies/cepre-uni/"
  "https://josepintado24.github.io/en/case-studies/movistar/"
  "https://josepintado24.github.io/en/case-studies/crepier/"
  "https://josepintado24.github.io/en/case-studies/radioshack/"
  "https://josepintado24.github.io/en/case-studies/desly/"
  "https://josepintado24.github.io/en/case-studies/cepre-uni/"
  "https://josepintado24.github.io/es/education/upc/"
  "https://josepintado24.github.io/es/education/esan/"
  "https://josepintado24.github.io/es/education/cibertec/"
  "https://josepintado24.github.io/en/education/upc/"
  "https://josepintado24.github.io/en/education/esan/"
  "https://josepintado24.github.io/en/education/cibertec/"
  "https://josepintado24.github.io/es/credentials/esan-desarrollo-ejecutivo/"
  "https://josepintado24.github.io/es/credentials/esan-arquitectura-soluciones/"
  "https://josepintado24.github.io/es/credentials/esan-e-commerce/"
  "https://josepintado24.github.io/es/credentials/esan-analitica-web/"
  "https://josepintado24.github.io/es/credentials/ceti-frontend-angular-react/"
  "https://josepintado24.github.io/es/credentials/ceti-php-laravel-mysql/"
  "https://josepintado24.github.io/es/credentials/ceti-facturacion-electronica-php/"
  "https://josepintado24.github.io/es/credentials/infopuc-java/"
  "https://josepintado24.github.io/es/credentials/udemy-solid-clean-code/"
  "https://josepintado24.github.io/es/credentials/2026-courses/"
  "https://josepintado24.github.io/es/credentials/2025-platzi/"
  "https://josepintado24.github.io/en/credentials/esan-desarrollo-ejecutivo/"
  "https://josepintado24.github.io/en/credentials/esan-arquitectura-soluciones/"
  "https://josepintado24.github.io/en/credentials/esan-e-commerce/"
  "https://josepintado24.github.io/en/credentials/esan-analitica-web/"
  "https://josepintado24.github.io/en/credentials/ceti-frontend-angular-react/"
  "https://josepintado24.github.io/en/credentials/ceti-php-laravel-mysql/"
  "https://josepintado24.github.io/en/credentials/ceti-facturacion-electronica-php/"
  "https://josepintado24.github.io/en/credentials/infopuc-java/"
  "https://josepintado24.github.io/en/credentials/udemy-solid-clean-code/"
  "https://josepintado24.github.io/en/credentials/2026-courses/"
  "https://josepintado24.github.io/en/credentials/2025-platzi/"
  "https://josepintado24.github.io/cv.pdf"
)

fail=0
for u in "${URLS[@]}"; do
  s=$(curl -s -o /dev/null -w "%{http_code}" "$u")
  printf "%s %s\n" "$s" "$u"
  if [ "$s" != "200" ]; then fail=$((fail+1)); fi
done

echo "---"
echo "JSON-LD presence on case study detail:"
ld=$(curl -s "https://josepintado24.github.io/es/case-studies/movistar/" | grep -c '"@type":"CreativeWork"')
echo "movistar CreativeWork matches: $ld"
if [ "$ld" -lt 1 ]; then fail=$((fail+1)); fi

echo "---"
echo "PendingAsset on unsupplied credentials:"
for c in esan-arquitectura-soluciones ceti-php-laravel-mysql infopuc-java udemy-solid-clean-code 2026-courses; do
  p=$(curl -s "https://josepintado24.github.io/es/credentials/$c/" | grep -c "pending-asset")
  printf "  %s pending-asset: %s\n" "$c" "$p"
  if [ "$p" -lt 1 ]; then fail=$((fail+1)); fi
done

echo "---"
echo "Total failures: $fail"
exit $fail

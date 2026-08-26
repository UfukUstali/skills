#!/usr/bin/env bash
set -euo pipefail

# Prints every ticket's state in a wayfinder map, then the frontier.
#   frontier.sh <map-dir>
# Ticket pages are <map-dir>/NN-<slug>.html; their state is in the <html> tag's data-* attributes.

dir="${1:?usage: frontier.sh <map-dir>}"
attr() { grep -o "$2=\"[^\"]*\"" "$1" | head -1 | sed 's/^[^"]*"//; s/"$//'; }

declare -A status title
ids=()
for f in "$dir"/[0-9][0-9]-*.html; do
  [ -e "$f" ] || continue
  id="$(attr "$f" data-id)"
  [ -n "$id" ] || continue
  ids+=("$id")
  status[$id]="$(attr "$f" data-status)"
  title[$id]="$(sed -n 's/.*<title>[0-9]*: *\(.*\)<\/title>.*/\1/p' "$f" | head -1)"
done

frontier=()
for id in "${ids[@]}"; do
  f="$(ls "$dir"/"$id"-*.html | head -1)"
  claimed="$(attr "$f" data-claimed)"
  blocked="$(attr "$f" data-blocked-by)"
  open_blockers=0
  for b in $blocked; do
    [ "${status[$b]:-closed}" = "open" ] && open_blockers=1
  done
  mark=" "
  if [ "${status[$id]}" = "open" ] && [ -z "$claimed" ] && [ "$open_blockers" = 0 ]; then
    mark="*"
    frontier+=("$id ${title[$id]}")
  fi
  printf '%s %s  %-7s %-9s %-4s blocked-by:[%s] claimed:[%s]  %s\n' \
    "$mark" "$id" "${status[$id]}" "$(attr "$f" data-type)" "$(attr "$f" data-mode)" "$blocked" "$claimed" "${title[$id]}"
done

echo
if [ "${#frontier[@]}" -gt 0 ]; then
  echo "frontier:"; printf '  %s\n' "${frontier[@]}"
else
  echo "frontier empty"
fi

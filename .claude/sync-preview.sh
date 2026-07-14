#!/bin/bash
set -e
SRC="/Users/mariagarciavelasco/Desktop/my-website"
DST="/tmp/mave-site"
mkdir -p "$DST"
rm -rf "$DST/css" "$DST/js" "$DST/img" "$DST/v2"
cp "$SRC"/*.html "$DST"/
cp -R "$SRC/css" "$SRC/js" "$SRC/img" "$DST/"
rm -rf "$DST/img/_full"
[ -d "$SRC/v2" ] && cp -R "$SRC/v2" "$DST/"
cp "$SRC/.claude/serve.rb" "$DST/serve.rb"
echo "Synced $SRC -> $DST"

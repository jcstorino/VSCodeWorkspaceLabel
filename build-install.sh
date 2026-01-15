#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

npm run compile

# Increment patch version without creating a git tag.
npm version patch --no-git-tag-version

VERSION=$(node -p "require('./package.json').version")

npx vsce package --no-yarn --allow-star-activation --skip-license

code-insiders --install-extension "./workspace-label-${VERSION}.vsix" --force

echo "Installed workspace-label-${VERSION}.vsix"

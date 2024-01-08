npm run build
cp package.json build/
cp package-lock.json build/
cp .env build/
cp -r node_modules/ build/
cd build
npm ci --omit dev

echo "Run node build to start the server"
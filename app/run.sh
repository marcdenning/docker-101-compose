echo "location /api/ {proxy_pass $API_URL/api/;}" > /etc/nginx/conf.d/proxy.conf
nginx -g "daemon off;"

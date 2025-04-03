# mern-repo.github.io
mysql express react node

# GITHUB
https://github.com/mern-repo/mern-repo.github.io

# RENDER.COM
https://dashboard.render.com/login

# HOSTGATOR
https://mern.theseashore.ph/

const db = mysql.createConnection({
  host: '192.185.17.41',
  user: 'webadmin_chinabank',
  password: 'chinaAdmin!',
  database: 'webadmin_crud'
})

# HTACCESS
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# SSH
ssh webadmin@192.185.17.41 -p2222

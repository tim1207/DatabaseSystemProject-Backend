# DatabaseSystemProject-Backend


## Project setup
```
npm install
```

### Run Server
```
npm run start
```

### Run MySQL
```
npm run mysql:start
```
> 如果遇到 no matching manifest for linux/arm64/v8 in the manifest list entries 這個錯誤  
> 編輯docker-compose.yml 
> - #platform: linux/amd64 -> platform: linux/amd64

### Stop MySQL
```
npm run mysql:stop
```

### Recreate MySQL
```
Windows: initMySQL.bat
Ubuntu: initMySQL.sh
Mac OS: initMySQL.sh
```
> 如果出現 permission denied  
> 開啟Terminal輸入:sudo chmod 755 initMySQL.*
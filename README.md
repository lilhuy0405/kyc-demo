# KYC example for Babbu
## 1. Login with telegram 
- using telegram bot login with login widget: https://core.telegram.org/widgets/login
- First, includes this script tag in index.html
```html
<script async src="https://telegram.org/js/telegram-widget.js?22"></script>
```
- The script will add Telegram object to window object then use `window.Telegram.Login.auth` to login with bot_id `6546635625`
- When login process done. use the auth response from telegram to make a request to backend api `/user-kyc/telegram` body example `{
  "id": 1740827516,
  "first_name": "Babbu",
  "last_name": "Babbu",
  "username": "Babbu",
  "photo_url": "https://t.me/i/userpic/320/NCGppmEAmtD_qMGybupYxLME3Bith5cVbL8EZoTXez4.jpg",
  "auth_date": 1740827516,
  "hash": "660faf85872dba1f81356c9a7933ca9e54be9"
}` the API will use the hash to validate that if the request body is a valid telegram credentials then save the valid data to database

## 2 Login with facebook
- First, install this package `react-facebook` or you can init Facebook SDK yourself. This lib just do it for you
- Wrap your app components with `FacebookProvider` component
```jsx
    <FacebookProvider appId='998655314519567' version='v18.0' cookie={true} xfbml={true}>
      <App/>
    </FacebookProvider>
```
- appId `998655314519567`
- To login use `useLogin()` hook from `react-facebook` package this will open login with facebook window and get the user access token when login success
- But we also need user profile for KYC. the `useProfile()` hook can do it but the code of this lib have a problems that call useEffect() infintely and make a tons of request to facebook then make the api is in max rate limit status
- IMPORTANT: <b>DO NOT USE THE `useProfile()` HOOK</b>
- By digging in the package source code we can use this way to get user profile by using the `useFacebook()` hook

```js
const {init} = useFacebook();
//.....
const api = await init();
if (!api) {
   throw new Error('Facebook API failed to initialize');
}
const profile: any = await api.getProfile({
   fields: ['id', 'first_name', 'last_name', 'middle_name', 'name', 'name_format', 'picture', 'short_name', 'email']
});
console.log(profile);
```
- When process done get the user profile and the access token to send a POST request to the api `/user-kyc/facebook` example body: `{
  "id": "3589343098017505",
  "name": "Lưu Huy",
  "accessToken": "EAAOMRY9GZAg8BO4CZA5z2kjZBbJy89CzXKuQbp22...",
  "avatar": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3589343098017505&height=50&width=50&ext=1698515601&hash=AeQgfZzfdvWIVgN8X_8"
}` The API will use access token to check that is the request body is from the facebook application as registed and is the data is valid

## 3 Login with twitter
- Login or kyc with twitter using Oauth2
- first call `/user-kyc/twitter/logged/auth` with Get method if you have logged in and want to kyc with twiiter. Otherwise call `/user-kyc/twitter/auth` when need to login with twitter. This'll return an auth url open it then author the twitter account
- When login process done BE will redirect to this page in fe `/twitter-login-callback` this path can config With these params: `jwt`, `error`, `state`
- Mapping the state at the params of auth url below to this state if is equals => a valid callback then set the jwt to local storage if it exist if jwt is empty string and error is null => user kyc with twitter success

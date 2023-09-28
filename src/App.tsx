
declare global {
  interface Window { Telegram: any; }
}

window.Telegram = window.Telegram || {};

function App() {
  const handleTelegramLogin = () => {
    window.Telegram.Login.auth(
      {bot_id: 'demo_babbu_login_bot', request_access: true},
      (data: any) => {
        if (!data) {
          // authorization failed
          console.log("login failed");
        }

        // Here you would want to validate data like described there https://core.telegram.org/widgets/login#checking-authorization
        console.log("login data", data)
      }
    );
  }
  return (
    <>
      <h1>KYC Demo for Babbu</h1>
      <button onClick={handleTelegramLogin}>
        Login with Telegram
      </button>
    </>
  )
}

export default App

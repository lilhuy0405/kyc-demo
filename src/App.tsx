import {useState} from "react";
import {useLogin} from "react-facebook";

declare global {
  interface Window {
    Telegram: {
      Login: {
        auth: (options: any, callback: (data: any) => void) => void;
      }
    };
  }
}

window.Telegram = window.Telegram || {};

function App() {
  const [telegramLoginData, setTelegramLoginData] = useState<any>(null);
  const {login, status, isLoading, error} = useLogin();
  console.log(status, isLoading, error)
  const handleTelegramLogin = () => {
    window.Telegram.Login.auth(
      {bot_id: '6546635625', request_access: true},
      (data: any) => {
        if (!data) {
          // authorization failed
          console.log("login failed");
          return;
        }

        // Here you would want to validate data like described there https://core.telegram.org/widgets/login#checking-authorization
        console.log("login data", data)
        setTelegramLoginData(data);
      }
    );
  }

  const handleLoginFacebook = async () => {
    try {
      const response = await login({
        scope: 'public_profile',
      });

      console.log(response);
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <>
      <h1>KYC Demo for Babbu</h1>
      <div>
        <button onClick={handleTelegramLogin}>
          Login with Telegram
        </button>
      </div>
      <div>
        <button onClick={handleLoginFacebook} disabled={isLoading}>
          Login via Facebook
        </button>
      </div>
      <div>
        {telegramLoginData && (
          <>
            <h2>Telegram Login Data</h2>
            <pre>{JSON.stringify(telegramLoginData, null, 2)}</pre>
          </>
        )}
      </div>
    </>
  )
}

export default App

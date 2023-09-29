import {useState} from "react";
import {LoginStatus, useFacebook, useLogin} from "react-facebook";
import querystring from "query-string";

const Home = () => {
  const [telegramLoginData, setTelegramLoginData] = useState<any>(null);
  const [fbProfile, setFbProfile] = useState<any>(null);
  const {login, isLoading} = useLogin();
  const {init} = useFacebook();

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
        scope: 'email',
      });
      if (response.status !== LoginStatus.CONNECTED) {
        throw new Error('Facebook Login failed');
      }
      //fetch user profile
      const api = await init();
      if (!api) {
        throw new Error('Facebook API failed to initialize');
      }
      console.log(response)
      const profile: any = await api.getProfile({
        fields: ['id', 'first_name', 'last_name', 'middle_name', 'name', 'name_format', 'picture', 'short_name', 'email']
      });
      console.log(profile);
      setFbProfile({
        ...profile,
        accessToken: response.authResponse.accessToken,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }
  const handleLoginTwitter = async () => {
    try {
      const response = await fetch("https://backend-airdrop-app.vinhomes.co.uk/user-kyc/twitter/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        }
      })
      if (!response.ok) {
        throw new Error("Twitter Login failed");
      }
      const data = await response.json();
      const {url} = data.data;
      if (!url) {
        throw new Error("Twitter Login failed");
      }
      const authUrlParsed = querystring.parse(url);
      const stateCode = authUrlParsed.state as string;
      //save state code to local storage
      localStorage.setItem("stateCode", stateCode);
      //open auth url in new window
      window.open(url, "_blank", "width=500,height=500");
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
        <button onClick={handleLoginTwitter}>
          Login via Twitter
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
      <div>
        {fbProfile && (
          <>
            <h2>Facebook Profile</h2>
            <pre>{JSON.stringify(fbProfile, null, 2)}</pre>
          </>
        )}
      </div>
    </>
  )
}
export default Home;

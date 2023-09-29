import {Link, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

const TwitterLoginCb = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');
  const accessToken = searchParams.get('accessToken');
  const stateInQuery = searchParams.get('state');
  const stateInLocalStorage = localStorage.getItem('stateCode');
  useEffect(() => {
    if (error) {
      //when error, remove stateCode from local storage
      window.localStorage.removeItem('stateCode');
      window.open("", "_self");
      window.close();
      return;
    }
    if (stateInQuery && stateInLocalStorage && stateInQuery === stateInLocalStorage && accessToken) {
      //user login with twitter successfully
      window.localStorage.removeItem('stateCode');
      window.localStorage.setItem('jwt', accessToken);
      window.open("", "_self");
      window.close();
      return;
    }
    if (stateInQuery && stateInLocalStorage && stateInQuery === stateInLocalStorage) {
      //user kyc with twitter successfully
      window.localStorage.removeItem('stateCode');
      window.open("", "_self");
      window.close();
      return;
    }
    //close
    window.localStorage.removeItem('stateCode');
    window.open("", "_self");
    window.close();

  }, [searchParams, stateInLocalStorage]);
  return (
    <>
      <div>
        {
          error && <div>{error}</div>
        }
        {
          accessToken && <div>jwt: {accessToken}</div>
        }
        if not jwt and not error means that the user has connected to twitter successfully
      </div>
      <div>
        <Link to='/'>Back to home</Link>
      </div>
    </>
  )
}

export default TwitterLoginCb
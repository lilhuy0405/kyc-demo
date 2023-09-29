import {Link, useSearchParams} from "react-router-dom";

const TwitterLoginCb = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');
  const accessToken = searchParams.get('accessToken');
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
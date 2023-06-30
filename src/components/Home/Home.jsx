import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='bg-[https://t3.ftcdn.net/jpg/03/45/97/36/360_F_345973621_sMifpCogXNoIDjmXlbLwx1QZA5ZmQVl8.jpg] bg-cover bg-no-repeat bg-center'>
      <Link to="/quiz">
        <Button className='bg-green-500 text-white my-80 mx-96' type='primary'>
          Start Quiz
        </Button>
      </Link>
    </div>
  );
}

export default Home;

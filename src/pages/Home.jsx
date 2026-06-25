import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>YOUR COLOR PALETTE</h1>
      <p>나를 색으로 기록하고 이해해보세요</p>
      <Link to="/mypalette">시작하기</Link>
    </div>
  );
}

export default Home;

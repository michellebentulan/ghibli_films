import "./main-app.scss";
import { Outlet } from "react-router-dom";

export function MainApp() {
  return (
    <div>
      
      <Outlet />
    </div>
  );
}

export default MainApp;

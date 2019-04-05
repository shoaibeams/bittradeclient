import * as React from "react";
import { BaseComponent } from "../../app/components/base/BaseComponent";
import { RestrictedRoutes, OpenRoutes } from "../../routes";
import MainApp from "./MainApp";

export default class BVApp extends BaseComponent {

  render() {
    return this.isNullOrEmpty(this.g.langKey) ? null :
      <>
        {
            RestrictedRoutes(this.props)
          // this.g.isLoggedIn ?
          //   <>
          //     <MainApp {...this.props} />
          //     {OpenRoutes(this.props)}
          //   </>
          //   :
          //   <>
          //     {OpenRoutes(this.props)}
          //   <MainApp {...this.props} />
          //   </> 
            // this.g.isLoggedIn ?
            // RestrictedRoutes(this.props)
            // // <MainApp {...this.props} />
            // :
            // OpenRoutes(this.props)
        }
      </>
  }
}

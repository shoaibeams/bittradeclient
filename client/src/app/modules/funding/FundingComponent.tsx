import * as React from "react";
import DepositComponent from "./DepositComponent";
import { Switch, Route } from "react-router";
import { mdProps } from "../../../models/props";

const FundingComponent = (props) => {
  return (
    <Switch>
      <Route path={`${props.match.url}/deposit`} render={() => <DepositComponent {...props} />} />
    </Switch>
  );
}
  
export default FundingComponent;
// export default class FundingComponent extends BaseComponent {

//     render() {
//         this.initShorts();
//         return (
//             <div className="mainpage clearfix">
//                 <section className="tradingwrap  dashboad clearfix">
//                     <div className=" col-md-12">
//                         <ul className="nav nav-tabs">
//                             <li className="active"><a data-toggle="tab" href="#deposit">{this.lang.Deposit}</a></li>
//                             <li><a data-toggle="tab" href="#withdrawl">{this.lang.Withdrawl}</a></li>
//                         </ul>
//                         <div className="tab-content">
//                             <div id="deposit" className="tab-pane fade in active">
//                                 <DepositComponent {...this.props} />
//                             </div>
//                             <div id="withdrawl" className="tab-pane fade in">
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>
//         );
//     }

//     constructor(props) {
//         super(props);
//         this.init();
//     }

//     init() {
//     }

// }
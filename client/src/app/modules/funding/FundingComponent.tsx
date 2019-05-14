import * as React from "react";
import { Switch, Route } from "react-router";
import { mdProps } from "../../../models/props";
import DepositComponent from "./deposit/DepositComponent";
import { Constants } from "../../../shared/constants";
import WithdrawalComponent from "./withdrawal/WithdrawalComponent";

const FundingComponent = props => {
  return (
    <Switch>
      <Route
        path={`${props.match.url}${Constants.Instance.RoutePaths.Deposit}`}
        render={() => <DepositComponent {...props} />}
      />
      <Route
        path={`${props.match.url}${Constants.Instance.RoutePaths.Withdrawal}`}
        render={() => <WithdrawalComponent {...props} />}
      />
    </Switch>
  );
};

export default FundingComponent;

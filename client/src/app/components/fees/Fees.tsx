import * as React from "react";
import { Table, Card, Divider } from "antd";
import { withdrawlDataSource, withdrawlColumns } from "./staticDataWithdrawl";
import { depositDataSource, depositColumns } from "./staticDataDeposit";
import "./fees.less";
import { BaseComponent } from "../base/BaseComponent";
import SaveMoneyCard from "./SaveMoneyCard/SaveMoneyCard";

export default class Fees extends BaseComponent {
  render() {
    return (
      <>
        <SaveMoneyCard />
        {/*-----------------------------FEE TABLES--------------=======-----------*/}
        <div className="fee-tables-container">
          <Card className="">
            {/*-----------------------TABLE #1----------------------------------*/}
            <div>
              <h1 className="heading-medium">{this.lang.Deposit}&nbsp;</h1>
              <Table
                dataSource={depositDataSource}
                columns={depositColumns}
                pagination={false}
              />
            </div>

            <div className="trading-table-footer" style={{ marginTop: "30px" }}>
              <p>
                <sup>*</sup>
                {this.lang.FeeFooter}
              </p>
            </div>
            <Divider />
            {/*-----------------------TABLE #2----------------------------------*/}
            <div>
              <h1 className="heading-medium">{this.lang.Withdrawl}&nbsp;</h1>
              <Table
                dataSource={withdrawlDataSource}
                columns={withdrawlColumns}
                pagination={false}
              />
              <div
                className="trading-table-footer"
                style={{ marginTop: "30px" }}
              >
                <p>
                  <sup>*</sup>
                  {this.lang.FeeFooter}
                </p>
              </div>
            </div>
            <Divider />
            {/*-----------------------TABLE #3----------------------------------*/}
            <div>
              <h1 className="heading-medium">{this.lang.Trading}&nbsp;</h1>
              <Table
                dataSource={withdrawlDataSource}
                columns={withdrawlColumns}
                pagination={false}
              />
              <div
                className="trading-table-footer"
                style={{ marginTop: "30px" }}
              >
                <p>
                  <sup>*</sup>
                  {this.lang.FeeFooter}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </>
    );
  }
}

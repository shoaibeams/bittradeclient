import React from "react";
import { Table, Card, Divider } from "antd";
import { withdrawlDataSource, withdrawlColumns } from "./staticDataWithdrawl";
import { depositDataSource, depositColumns } from "./staticDataDeposit";
import { BaseComponent } from "../base/BaseComponent";
import BigCard from "./BigCard/BigCard";
import "./fees.less";

export default class Fees extends BaseComponent {
  render() {
    return (
      <>
        <BigCard params={{ image: "/assets/images/save-money.svg" }}>
          <h1 className="heading-huge">
            {this.lang.Our} {this.lang.Fees}
          </h1>
          <ul className="list-big">
            <li>{this.lang.FeeLine1}</li>
            <li>{this.lang.FeeLine2}</li>
            <li>{this.lang.FeeLine3}</li>
            <li>{this.lang.FeeLine4}</li>
          </ul>
        </BigCard>

        {/*-----------------------------FEE TABLES------------------------------*/}
        <div className="fee-tables-container">
          <Card>
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

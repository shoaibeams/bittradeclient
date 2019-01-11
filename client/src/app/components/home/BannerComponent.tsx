// import { BaseComponent } from "../BaseComponent";
// import * as React from "react";

// export class HomeComponent extends BaseComponent {

//     render()
//     {
//         return(
//         <section className="banner clearfix">
//         <div className="container">
//             <p> Buy your digital assests in native currency pairs to reduce huge conversion cost.
//                 Now supporting buying in GBP, Euro and USD</p>
//             <div className="row">
//                 <div className="col-md-12">
//                     <span className="last_price brdroup" style="width:100%;margin:0px 20px; line-height: 25px; float:right;">
//                             {
//                                 //start from here
//                                 this.getCurrencyPairDropDown()
//                             }
//                     </span>
//                 </div>
//             </div>
//             <div className="bannerb clearfix" [nbSpinner]="loadingPairDetails || loadingCurrencies">
//                 <div className="col-md-3 col-sm-6 col-xs-6">
//                     <div className="buy-txt">Buy {selectedCurrencyPair.fc_name} at:<br>
//                         <span [@amountChanged]="animValues.current_buy">{selectedBriefHistory.current_buy}</span>
//                         {selectedCurrencyPair.tc_name}
//                         <a [routerLink]="globals.isLoggedIn ? constants.RoutePaths.Trade : constants.RoutePaths.Login">
//                             <img src="assets/images/buy-icon.png" [alt]="lang.Buy">
//                             <br>
//                             {lang.Sell} {lang.Now}</a> </div>
//                 </div>
//                 <div className="col-md-3 col-sm-6 col-xs-6">
//                     <div className="sell-txt">{lang.Sell} {selectedCurrencyPair.fc_name} at:<br>
//                         <span [@amountChanged]="animValues.current_sell">{selectedBriefHistory.current_sell}</span>
//                         {selectedCurrencyPair.tc_name} <a [routerLink]="globals.isLoggedIn ? constants.RoutePaths.Trade : constants.RoutePaths.Login">

//                             <img src="assets/images/sell-icon.png" [alt]="lang.Sell">
//                             <br>
//                             {lang.Sell} {lang.Now} </a> </div>
//                 </div>
//                 <div className="col-md-6 col-sm-12 col-xs-12">
//                     <div className="row">
//                         <div className="buysellwrap clearfix">
//                             <form [formGroup]="form">
//                                 <div className="von-form clearfix">
//                                     <div className="von-left">
//                                         <h4 style="display:table;"><span [ngStyle]="getBuyStyle()">Buy</span><span>&nbsp;</span>
//                                             <label className="switch" style="vertical-align: middle;">
//                                                 <input (change)="buySellChange()" [value]="isBuy" type="checkbox">
//                                                 <span className="slider"></span>
//                                             </label>
//                                             <span>&nbsp;</span><span [ngStyle]="getSellStyle()">Sell</span></h4>
//                                         <input formControlName="fc" (input)="calculatorInput(1)" [step]="fcStep"
//                                             numberd-only min="0" type="number" className="form-control" [placeholder]="fcPlaceholder ? fcPlaceholder : 0">
//                                     </div>
//                                     <div className="von-right">
//                                         <span className=" buy-btn">
//                                             <span className="select-wrapper" style="background:none; height:100%;">
//                                                 <span className="holder">{selectedCurrencyPair.fc_name}</span></span>
//                                         </span>
//                                     </div>
//                                 </div>
//                                 <div className="von-form clearfix">
//                                     <div className="von-left">
//                                         <h4 [innerHTML]="isBuy ? lang.Cost : lang.YouGet"></h4>
//                                         <input formControlName="tc" (input)="calculatorInput(2)" [step]="tcStep"
//                                             numberd-only min="0" type="number" className="form-control" [placeholder]="tcPlaceholder">
//                                     </div>
//                                     <div className="von-right">
//                                         <span className=" sell-btn">
//                                             <span className="select-wrapper" style="background:none;">
//                                                 <span className="holder">{selectedCurrencyPair.tc_name}</span>
//                                             </span>
//                                         </span>
//                                     </div>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
//     );
//     }

//     constructor(props)
//     {
//         super(props);
//     }
    
//     setSelectedCurrencyPair(id: number) {
//         if (!id) {
//             return;
//         }
//         let cps = this.currencyPairs.filter(m => m.id == id);
//         if (cps.length > 0) {
//             this.selectedCurrencyPair = cps[0];
//             this.tcStep = 1 / Math.pow(10, StaticHelper.minScale(this.selectedCurrencyPair.tcd_scale));
//             this.fcStep = 1 / Math.pow(10, StaticHelper.minScale(this.selectedCurrencyPair.fcd_scale));
//             if (this.briefHistory) {
//                 let sbh = this.briefHistory.filter(m => m.id == id);
//                 if (sbh.length > 0) {
//                     let old = this.selectedBriefHistory;
//                     this.selectedBriefHistory = sbh[0];
//                     this.selectedBriefHistory.old = old;
//                     this.setAnimValuesForSelectedPairHistory(this.selectedBriefHistory);
//                 }
//                 this.calculatorInput(1);
//             }
//         }
//     }

// }
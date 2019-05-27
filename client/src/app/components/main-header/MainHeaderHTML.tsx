import React from "react";
import { Link } from "react-router-dom";
import { BaseComponent } from "../base/BaseComponent";

export default class HeaderComponentHTML extends BaseComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header>
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#myNavbar"
              >
                <span className="icon-bar" />
                <span className="icon-bar" /> <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="#">
                <img src="/assets/images/logo.png" alt="Bit" />
              </a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">{this.NavLinks()}</ul>
              <ul className="nav navbar-nav navbar-right signup-header">
                {!this.props.globals.isLoggedIn ? (
                  <>
                    <li onClick={this.props.params.navItemClicked(-1)}>
                      <Link to={this.getLink(this.constants.RoutePaths.SignUp)}>
                        <img
                          src="/assets/images/lock-icon.png"
                          alt={this.lang.SignUp}
                        />
                        {this.lang.SignUp}
                      </Link>
                    </li>
                    <li onClick={this.props.params.navItemClicked(-1)}>
                      <Link to={this.getLink(this.constants.RoutePaths.Login)}>
                        <img
                          src="/assets/images/sign-icon.png"
                          alt={this.lang.Login}
                        />
                        {this.lang.Login}
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="dropdown ">
                    <a
                      href="#"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      {" "}
                      <i className="fa fa-user" />
                      {this.props.globals.user.username}
                      <i className="fa fa-angle-down" />
                    </a>
                    <ul className="dropdown-menu right-to-left">
                      <li>
                        <a onClick={this.props.params.logout}>
                          {this.lang.Logout}
                        </a>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }

  NavLinks = () => {
    let links = this.props.params.routerLinks.map((l: any, i: number) => {
      return (l.requrieLogin && this.props.globals.isLoggedIn) ||
        !l.requrieLogin ? (
        <li
          className={l.class}
          key={i}
          onClick={this.props.params.navItemClicked(i)}
        >
          {l.children.length > 0 ? (
            <>
              <Link
                to={this.getLink(l.routerLink)}
                className="dropdown-toggle"
                data-toggle="dropdown"
              >
                <span>
                  <img src={l.icon} alt={l.alt} />
                </span>
                <span>
                  {l.text} <i className="fa fa-angle-down" aria-hidden="true" />
                </span>
              </Link>
              <ul className="dropdown-menu">
                {l.children.map((c, i: number) => {
                  return (
                    <li key={i} onClick={this.props.params.navItemClicked(i)}>
                      <Link to={this.getLink(c.routerLink)} href={c.routerLink}>
                        {c.text}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : l.routerLink != null ? (
            <Link to={this.getLink(l.routerLink)}>
              <span>
                <img width="40" height="34" src={l.icon} alt={l.alt} />
              </span>
              <span>{l.text}</span>
            </Link>
          ) : (
            <a href={l.href}>
              <span>
                <img width="40" height="34" src={l.icon} alt={l.alt} />
              </span>
              <span>{l.text}</span>
            </a>
          )}
        </li>
      ) : null;
    });
    return links;
  };
}

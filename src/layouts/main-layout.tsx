import './main-layout.css!';
import * as React from 'react';
import { LayoutTopNav, LayoutTopNavLink } from './components/layout-top-nav';
import { LayoutHeader } from './components/layout-header';
import { LayoutMain } from './components/layout-main';
import { LayoutFooter } from './components/layout-footer';



export class MainLayout extends React.Component<{}, {}> {
  render() {
   
    const {children} = this.props;
    return (
      <div className="c-text">
        <LayoutHeader>
          <LayoutTopNav>
            <LayoutTopNavLink href="/" isPrimary> Home </LayoutTopNavLink>
            <LayoutTopNavLink href="/document"> Dokument </LayoutTopNavLink> 
            <LayoutTopNavLink href="/login"> Login </LayoutTopNavLink>
          </LayoutTopNav>
        </LayoutHeader>

        <LayoutMain>
          {children}
        </LayoutMain>

        <LayoutFooter>
          2017 &copy; Helmut Ritter<br />
          <a href="https://github.com/Webritter/WbiWordAddInTs">Back to GitHub Repo</a>
        </LayoutFooter>
      </div>
    );
  };
};


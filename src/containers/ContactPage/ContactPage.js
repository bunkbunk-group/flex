import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '..';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.css';
import image from './about-us-1056.jpg';

const ContactPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="Help"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'ContactPage',
        description: 'Help',
        name: 'Help page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Contact</h1>
          

    


          <div className={css.contentWrapper}>
            <div className={css.contentSide} style={{fontSize: '4rem'}}>🦄</div>
            <div className={css.contentMain}>
              <p>
              The Bunkbunk Headquarters<br/>
              Ruoholahdenkatu 6 B 37<br/>
              00180 Helsinki, Finland<br/>
              +358449722114<br/>
              bunkbunkapp@gmail.com
              </p>
            </div>
          </div>
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default ContactPage;

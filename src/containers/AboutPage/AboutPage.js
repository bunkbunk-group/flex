import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './AboutPage.css';
import image from './kotisohva.jpg';

const AboutPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="About Us"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'About Saunatime',
        name: 'About page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar>

        <LayoutWrapperMain className={css.staticPageWrapper}>
          <h1 className={css.pageTitle}>Experience unique homes and meet amazing locals</h1>
          <img className={css.coverImage} src={image} alt="My first ice cream." />

          <div className={css.contentWrapper}>
            <div className={css.contentSide}>
              <p>
                Did you know that Finland has more than 7 million bunks - more than one bunk per
                person
              </p>
            </div>
            <div className={css.contentMain}>
              <p style={{ fontWeight: 'bold' }}>
                What is the main point of travelling? We at bunkbunk believe it is to immerse the
                essence of the local cultures. And is there a better way for it than staying at real
                local homes?
              </p>
              <h2>Go home. Host people. Earn money.</h2>
              <p>
                Bunkbunk hosts are able to earn money by using any square meter of their actual home
                to host travellers. In bunkbunk you can only host in your real home where you
                actually live in. Bunkbunk reimagines travelling back to its roots: enabling
                connections between locals and travellers.
              </p>
              <h2>We make travelling easier and cheaper</h2>
              <p>
                Travellers are allowed to visit overnight for a relatively low price so it's perfect
                for budget travellers and to anyone who wants to save money. Most of the bunkbunk
                hosts are highly committed to provide high-class local tips for free and many of
                them are happy to show around and cook local food with you.
              </p>
              <h2>Bunkbunk makes daytime stays easier than ever</h2>
              <p>
                Is there an easier way to earn some extra cash than letting travellers stay at your
                home while you will be out of home anyway during the day. Whether you're at work, at
                school or on a day trip. Bunkbunk literally prints money for you.
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

export default AboutPage;

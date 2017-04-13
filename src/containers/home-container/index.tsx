import * as React from 'react';
import { PageSection } from '../../components/page-section';
import { PageHero } from '../../components/page-hero';

export function HomeContainer() {
  return (
    <article>
      <PageHero title="Wilkommen zu WBI" subtitle="Wissen besser integrieren" />
      <PageSection className="u-centered">
        <img src="../../assets/image.png" />
      </PageSection>
      <PageSection className="o-container o-container--small">
        

         <p>
          WBI verbindet Mensch, Organisation und Technik miteinander.
        </p>
        
      </PageSection>
      <br />
    </article>
  );
};

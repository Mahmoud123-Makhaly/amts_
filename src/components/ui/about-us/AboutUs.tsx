import React from 'react';
import { Container } from 'reactstrap';

import TechnicalServices from './TechnicalServices';
import HowItWorks from './HowItWorks';
import WhyChooseUs from './WhyChooseUs';
import OurClients from './OurClients';

interface IAboutUsProps {
  data: { title: string; subtitle: string; cards: Array<{ imgSrc: string; title: string; description: string }> };
}
const AboutUs = (props: IAboutUsProps) => {
  const { data } = props;
  return (
    <React.Fragment>
      <Container>
        <TechnicalServices />
      </Container>
      <div className="bg-gray py-5">
        <HowItWorks data={data} />
      </div>
      <Container>
        <WhyChooseUs />
        <OurClients />
      </Container>
    </React.Fragment>
  );
};

export default AboutUs;

import React from 'react';
import { Carousel } from '@mantine/carousel';
import { rem, useMantineTheme} from '@mantine/core'; // Import rem if using numbers for gap
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import otp from '../../src/images/service otp.png';
import approval from '../../src/images/service approval.png';
import ecom from '../../src/images/service ecom.png';
import marketing from '../../src/images/service marketing.png';


// 1. Import Mantine Carousel CSS - VERY IMPORTANT!
import '@mantine/carousel/styles.css';

// 2. Import your custom styles for the cards (make sure it doesn't conflict badly)
import '../../src/styles/Services.css'; // Assuming this styles .service-card etc.

const servicesData = [
  {
    id: 1,
    image: otp,
    title: '2FA OTP via SMS',
    description: 'Authentifier vos utilisateur en utilisant un OTP SMS.',
  },
  {
    id: 2,
    image: approval,
    title: 'Approval via WhatsApp',
    description: 'Donnez pouvoir a vos manager pour traiter les demandes directemment sur WhatsApp.',
  },
  {
    id: 3,
    image: ecom,
    title: 'Ecommerce Messaging',
    description: 'Mettez a jour vos utilisateurs concernant leurs commandes.',
  },
  {
    id: 4,
    image: marketing,
    title: 'Marketing via WhatsApp',
    description: 'Notifier vos clients via WhatsApp sur vos nouveautes.',
  },
  // Add more services here easily
  // {
  //   id: 5,
  //   title: 'New Service',
  //   description: 'Description for the new service.',
  //   buttonText: 'Discover',
  //   bannerClass: 'banner-red', // Example
  // },
];


const Services = () => {
    const theme = useMantineTheme(); // Get theme for consistent styling
  
    const slides = servicesData.map((service) => (
      <Carousel.Slide key={service.id}>
        <div className="service-card">
          <div className={`service-banner ${service.bannerClass}`} />
          <div className="service-content">
            <img className='image-with-white-bg' src={service.image} alt={service.title} />
            <h5 style={{ fontWeight: 'bold' }}>{service.title}</h5>
            <p>{service.description}</p>
            <button
            class="cursor-pointer bg-violet-500 rounded-md text-white font-semibold transition duration-300 ease-in-out hover:bg-violet-700 hover:ring-2 hover:ring-violet-800 hover:shadow-xl hover:shadow-violet-500 focus:ring-violet-300 focus:shadow-violet-400 px-5 py-2"
            >
            Voir Plus
            </button>
          </div>
        </div>
      </Carousel.Slide>
    ));
  
    return (
      // Make sure MantineProvider wraps your App ideally, or at least this component
        <div className="services-container">
          <Carousel
            withIndicators
            // height={300} // Optional: Adjust height if needed
            slideSize={{ base: '100%', sm: '50%', md: '33.3333%' }}
            slideGap={{ base: rem(16), sm: 'xl' }} // Increased gap slightly
            loop
            align="start"
            slidesToScroll={1}
            withControls // Keep this true
            controlSize={40} // Make buttons slightly larger
            nextControlIcon={<IconArrowRight style={{ width: rem(20), height: rem(20) }} />}
            previousControlIcon={<IconArrowLeft style={{ width: rem(20), height: rem(20) }} />}
            // --- Custom Styles for Controls ---
            styles={{
              controls: {
                // Add some styles to the container of the controls if needed
                // e.g., adjust vertical position if controls are outside
              },
              control: {
                // Target both previous and next controls
                '&[data-inactive]': {
                  opacity: 0, // Keep inactive controls hidden
                  cursor: 'default',
                },
                // Core Styles
                backgroundColor: theme.white, // White background
                color: theme.colors.blue[6], // Use a theme color for the icon
                border: `1px solid ${theme.colors.gray[3]}`, // Subtle border
                opacity: 1, // Make them always visible
                boxShadow: theme.shadows.md, // Add shadow for depth
                borderRadius: theme.radius.xl, // Make them circular/fully rounded
  
                // Positioning (push them slightly outside the slide area)
                // Adjust these values as needed
                transform: 'translateY(-50%)', // Keep vertical centering
                // Note: Default positioning is complex. Overriding left/right
                // might require !important or more specific selectors if it conflicts.
                // Let's try adjusting the default offset first if needed using controlsOffset prop
                // controlsOffset: rem(-10), // Example: Try negative offset
  
                // Hover Effect
                transition: 'background-color 150ms ease, box-shadow 150ms ease',
                '&:hover': {
                  backgroundColor: theme.colors.gray[0], // Slight change on hover
                  boxShadow: theme.shadows.lg, // Increase shadow on hover
                },
                // Active State (when clicked)
                '&:active': {
                   transform: 'translateY(-50%) scale(0.95)', // Slight shrink on click
                   boxShadow: theme.shadows.sm,
                }
              },
              // You can target specific controls if needed
              // nextControl: {
              //   right: rem(-40), // Example: Push right control further out
              // },
              // previousControl: {
              //   left: rem(-40), // Example: Push left control further out
              // },
            }}
          >
            {slides}
          </Carousel>
        </div>
    );
  };
  
  export default Services;
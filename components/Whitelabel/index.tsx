import WelcomeSection from './WelcomeSection';
import MiniContactSection from './MiniContactSection';
import InstagramFull from './InstagramFull';
import PostSection from './PostSection';
import TextSection from './TextSection';
import PortfolioSection from './PortfolioSection';
import ButtonSection from './ButtonSection';

const RenderSection = ({ component, ...props }: any) => {
  switch (component) {
    case 'welcome_section':
      return <WelcomeSection {...props} />;
    case 'mini_contact_section':
      return <MiniContactSection {...props} />;
    case 'instagram_full':
      return <InstagramFull {...props} />;
    case 'post':
      return <PostSection {...props} />;
    case 'text':
      return <TextSection {...props} />;
    case 'portfolio_list':
      return <PortfolioSection {...props} />;
    case 'button':
      return <ButtonSection {...props} />;
    default:
      return null;
  }
};

export default RenderSection;

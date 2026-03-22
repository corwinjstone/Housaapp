import { createBrowserRouter } from 'react-router';
import { SellerOffers }    from './pages/SellerOffers';
import { MyHomes }         from './pages/MyHomes';
import { Marketplace }     from './pages/Marketplace';
import { AgentOfferDetail} from './pages/AgentOfferDetail';
import { EditListing }     from './pages/EditListing';
import { WizardShell }     from './pages/AddProperty/WizardShell';
import { Step1Address }    from './pages/AddProperty/Step1Address';
import { Step2Details }    from './pages/AddProperty/Step2Details';
import { Step3Features }   from './pages/AddProperty/Step3Features';
import { Step4Photos }     from './pages/AddProperty/Step4Photos';
import { Step5Goals }      from './pages/AddProperty/Step5Goals';
import { Step6Review }     from './pages/AddProperty/Step6Review';
import { SuccessScreen }   from './pages/AddProperty/Success';

export const router = createBrowserRouter([
  // ── Main screens
  { path: '/',             Component: SellerOffers    },
  { path: '/my-homes',     Component: MyHomes         },
  { path: '/marketplace',  Component: Marketplace     },
  { path: '/offers/:id',   Component: AgentOfferDetail},
  { path: '/edit-listing/:id',  Component: EditListing      },

  // ── Property submission wizard
  {
    path: '/add-property',
    Component: WizardShell,
    children: [
      { index: true,          Component: Step1Address  },
      { path: 'details',      Component: Step2Details  },
      { path: 'features',     Component: Step3Features },
      { path: 'photos',       Component: Step4Photos   },
      { path: 'goals',        Component: Step5Goals    },
      { path: 'review',       Component: Step6Review   },
    ],
  },

  // ── Post-submission
  { path: '/property-submitted', Component: SuccessScreen },
]);
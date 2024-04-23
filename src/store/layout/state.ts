export interface LayoutState {
  layout: {
    preloader: 'enable' | 'disable';
    changePreloader: (action: 'enable' | 'disable') => void;
  };
}

export const initialValues: LayoutState = {
  layout: { preloader: 'disable', changePreloader: () => {} },
};

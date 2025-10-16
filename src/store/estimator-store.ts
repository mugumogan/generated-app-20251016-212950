import { create } from 'zustand';
import { allAppTypes, AppType, commonQuestions } from '@/lib/data';
import { calculateEstimate, CalculationResults } from '@/lib/calculator';
import { ShareableState } from '@/lib/sharing';
interface EstimatorState {
  selectedApp: AppType | null;
  configuration: Record<string, any>;
  selectedFeatures: string[];
  results: CalculationResults | null;
  comparisonResults: CalculationResults | null;
  selectApp: (appId: string, initialFeatures?: string[]) => void;
  setConfiguration: (key: string, value: any) => void;
  addFeature: (featureId: string) => void;
  removeFeature: (featureId: string) => void;
  calculateResults: () => void;
  snapshotResults: () => void;
  clearComparison: () => void;
  hydrateFromState: (state: ShareableState) => void;
  reset: () => void;
}
const getInitialConfiguration = (app: AppType | null): Record<string, any> => {
  if (!app) return {};
  const config: Record<string, any> = {};
  [...commonQuestions, ...app.questions].forEach(q => {
    config[q.id] = q.defaultValue;
  });
  return config;
};
const createInitialState = () => ({
  selectedApp: null,
  configuration: {},
  selectedFeatures: [],
  results: null,
  comparisonResults: null,
});
export const useEstimatorStore = create<EstimatorState>((set, get) => ({
  ...createInitialState(),
  selectApp: (appId, initialFeatures) => {
    const app = allAppTypes.find((a) => a.id === appId) || null;
    set({
      selectedApp: app,
      configuration: getInitialConfiguration(app),
      selectedFeatures: initialFeatures || [],
      results: null,
      comparisonResults: null,
    });
  },
  setConfiguration: (key, value) =>
    set((state) => ({
      configuration: { ...state.configuration, [key]: value },
    })),
  addFeature: (featureId) =>
    set((state) => {
      if (state.selectedFeatures.includes(featureId)) {
        return state; // Avoid duplicates
      }
      return {
        selectedFeatures: [...state.selectedFeatures, featureId],
      };
    }),
  removeFeature: (featureId) =>
    set((state) => ({
      selectedFeatures: state.selectedFeatures.filter((id) => id !== featureId),
    })),
  calculateResults: () => {
    const { selectedApp, configuration, selectedFeatures } = get();
    if (selectedApp) {
      const results = calculateEstimate(selectedApp, configuration, selectedFeatures);
      set({ results });
    }
  },
  snapshotResults: () => {
    set(state => ({ comparisonResults: state.results }));
  },
  clearComparison: () => {
    set({ comparisonResults: null });
  },
  hydrateFromState: (state) => {
    const app = allAppTypes.find((a) => a.id === state.appId) || null;
    if (app) {
      set({
        selectedApp: app,
        configuration: state.configuration,
        selectedFeatures: state.selectedFeatures,
        comparisonResults: null,
      });
      get().calculateResults();
    }
  },
  reset: () => set(createInitialState()),
}));
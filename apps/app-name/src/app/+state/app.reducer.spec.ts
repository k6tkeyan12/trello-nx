import { FeatureList, Preference } from '../models/remember.status.model';
import {
  ErrorAction,
  ExitJobsiteFlowAction,
  FeatureListLoaded,
  GetHelpDocSuccess,
  GroupsLoaded,
  IndustryTypeFailed,
  IndustryTypesLoaded,
  LoadProductFamilyConfig,
  LoadTimeZoneListFailure,
  LoadTimeZoneListSuccess,
  PreferenceLoaded,
  ProductFamilyConfigLoadFailure,
  ProductFamilyConfigLoadSuccess,
  ResetAppState,
  ResetFeatureList,
  ResetIndustryTypes,
  ResetSecondaryDetail,
  ResetUCID,
  ResetUCIDName,
  SaveSecondaryDetail,
  SaveUCIDName,
  UCIDLoaded,
  UpdateAppFeatures
} from './app.actions';
import { appReducer, initialState } from './app.reducer';

describe('appReducer', () => {
  it('should get Preference data', () => {
    const preferencedata: Preference = {
      groupId: 1042,
      dateFormat: 'MM/DD/YY',
      timeFormat: 'HH:MM:SS 24hr',
      unit: 'US Standard',
      autoRefresh: 'None',
      language: 'English',
      remember: false
    };
    const action = new PreferenceLoaded(preferencedata);
    const state = appReducer(initialState, action);
    expect(state.preferenceData).toEqual(preferencedata);
  });

  it('should get UCID data', () => {
    const uciddata = {
      catRecID: 'QPS-23FF732F',
      cwsid: 'elangb',
      userRoleID: 1,
      userRoleName: 'Super Admin',
      tenantID: 1021,
      ucid: '1122334455',
      groupID: 1042
    };
    const action = new UCIDLoaded(uciddata);
    const state = appReducer(initialState, action);
    expect(state.ucidData).toEqual(uciddata);
  });

  it('should get group data', () => {
    const groupdata = [
      {
        id: 1042,
        name: '1122334455.Customer',
        description: '1122334455.Customer',
        parentID: 3,
        level: 2,
        ucid: '1122334455',
        groups: []
      }
    ];
    const action = new GroupsLoaded(groupdata);
    const state = appReducer(initialState, action);
    expect(state.groupData).toEqual(groupdata);
  });

  it('should get groups error', () => {
    const errormsg = 'user details failed';
    const action = new ErrorAction(errormsg);
    const state = appReducer(initialState, action);
    expect(state.errorData).toEqual(errormsg);
  });
  it('should get ExitJobsiteFlowAction', () => {
    const groupdata = true;
    const action = new ExitJobsiteFlowAction(true);
    const state = appReducer(initialState, action);
    expect(state.exitJobsiteFlow).toEqual(groupdata);
  });

  it('should get GetHelpDocSuccess', () => {
    const helpDoc = null;
    const action = new GetHelpDocSuccess(null);
    const state = appReducer(initialState, action);
    expect(state.helpDocURL).toEqual(helpDoc);
  });
  it('should get ResetUCID', () => {
    const ucidVal = null;
    const action = new ResetUCID();
    const state = appReducer(initialState, action);
    expect(state.ucidData).toEqual(ucidVal);
  });

  it('should get Feature List UCID data', () => {
    const uciddata = {
      catRecID: 'QPS-256B94A3',
      cwsid: 'shanmk10',
      groupID: 1122,
      tenantID: 1015,
      ucid: '2969515985',
      userRoleID: 12,
      userRoleName: 'Admin'
    };
    const FeatureResponse: FeatureList = {
      features: [
        {
          id: 1,
          name: 'SummaryDashboard',
          description: 'Cat Productivity summary dashboard feature.',
          ucid: '2969515985'
        }
      ]
    };
    const action = new FeatureListLoaded(uciddata.ucid);
    const state = appReducer(initialState, action);
    expect(JSON.stringify(state.Features)).toBe(JSON.stringify(FeatureResponse.features[0].ucid));
  });

  it('should work for IndustryTypesLoaded', () => {
    const industryTypeData = {
      industries: [
        {
          id: '1',
          name: 'Quarry',
          tags: [],
          zonetypes: [],
          content: {
            tabs: [],
            views: []
          }
        },
        {
          id: '2',
          name: 'Mass Excavation',
          tags: [],
          zonetypes: [],
          content: {
            tabs: [],
            views: []
          }
        }
      ],
      nextUrl: '',
      total: 10
    };
    const action = new IndustryTypesLoaded(industryTypeData);
    const state = appReducer(initialState, action);
    expect(state.industryTypes.entities['1']).toEqual(industryTypeData.industries[0]);
  });

  it('should work for IndustryType Failed', () => {
    const error = true;
    const action = new IndustryTypeFailed(true);
    const state = appReducer(initialState, action);
    expect(state.industryTypesFailed).toEqual(error);
  });

  it('should work for ResetIndustryTypes', () => {
    const action = new ResetIndustryTypes();
    const state = appReducer(initialState, action);
    expect(state.industryTypes).toEqual({ ids: [], entities: {} });
  });

  it('should work for ResetAppState', () => {
    const error = null;
    const action = new ResetAppState();
    const state = appReducer(initialState, action);
    expect(state.preferenceData).toEqual(error);
    expect(state.preferenceFailed).toEqual(error);
  });

  it('should work for LoadProductFamilyConfig', () => {
    const action = new LoadProductFamilyConfig();
    const actual = appReducer(initialState, action);
    expect(actual.productFamilyConfig).toEqual({});
  });

  it('should work for ProductFamilyConfigLoadSuccess', () => {
    const ProductFamilyConfigData = {
      A8P: [
        {
          snPrefix: 'A8P',
          assetTag: 'loaders',
          productFamily: 'OHT',
          assetTagGuid: 'HGFGDFTYR-YTRYTRHGFH-546FHGDHDHD',
          imageUrl: 'https://int-catproductivity.cat.com/assets/CAT-Logo.svg'
        }
      ]
    };
    const action = new ProductFamilyConfigLoadSuccess(ProductFamilyConfigData);
    const state = appReducer(initialState, action);
    expect(state.productFamilyConfig).toEqual(ProductFamilyConfigData);
  });

  it('should work for ProductFamilyConfigLoadFailure', () => {
    const error = { status: 500 } as any;
    const action = new ProductFamilyConfigLoadFailure(error);
    const state = appReducer(initialState, action);
    expect(state.productFamilyConfig).toEqual({});
  });

  it('should work for ResetFeatureList', () => {
    const action = new ResetFeatureList();
    const state = appReducer(initialState, action);
    expect(state.Features).toEqual(null);
  });

  it('should get Timezonelist', () => {
    const payload = [
      {
        id: 12,
        displayName: '(UTC-12:00) International Date Line West',
        standardName: 'Dateline Standard Time'
      }
    ];
    const action = new LoadTimeZoneListSuccess(payload);
    const state: any = appReducer(initialState, action);
    expect(state.timeZoneList).toBe(payload);
  });

  it('should get FeaturelistFailure', () => {
    const payload = { message: 'error' };
    const action = new LoadTimeZoneListFailure(true);
    const state: any = appReducer(initialState, action);
    expect(state.timeZoneListError).toBe(true);
  });

  it('should reset UCID AppFeatures', () => {
    const appFeatures = [
      {
        id: 17,
        name: 'InsightsCostKPIs',
        status: 'Active',
        showOnLogin: true
      }
    ];
    const action = new UpdateAppFeatures(appFeatures);
    const state: any = appReducer(initialState, action);
    expect(state.ucidData.appFeatures).toEqual(appFeatures);
  });

  it('should Save UCID Name', () => {
    const ucidName = 'ED Test Test';
    const action = new SaveUCIDName(ucidName);
    const state = appReducer(initialState, action);
    expect(state.UCIDName).toEqual(ucidName);
  });

  it('should work for ResetUCIDName', () => {
    const action = new ResetUCIDName();
    const state = appReducer(initialState, action);
    expect(state.UCIDName).toEqual(null);
  });

  it('should Save SecondaryDetail', () => {
    const siteDetails = {
      id: 56931,
      name: 'Cat Productivity'
    };
    const action = new SaveSecondaryDetail(siteDetails);
    const state = appReducer(initialState, action);
    expect(state.secondaryDetail).toEqual(siteDetails);
  });

  it('should work for ResetSecondaryDetail', () => {
    const action = new ResetSecondaryDetail();
    const state = appReducer(initialState, action);
    expect(state.secondaryDetail).toEqual(null);
  });
});

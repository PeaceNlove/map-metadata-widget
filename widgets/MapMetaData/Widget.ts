// jIMU (WAB) imports:
/// <amd-dependency path="jimu/BaseWidget" name="BaseWidget" />
declare var BaseWidget: any; // there is no ts definition of BaseWidget (yet!)
// declareDecorator - to enable us to export this module with Dojo's "declare()" syntax so WAB can load it:
import declare from './support/declareDecorator';

// esri imports:
import { PortalItem, Portal } from 'esri/arcgis/Portal'; 
import IdentityManager = require("esri/IdentityManager")
import Credential from "esri/Credential";

// dojo imports:
// import on from 'dojo/on';

import IConfig from './config';

interface IWidget {
  baseClass: string;
  config?: IConfig;
}

@declare(BaseWidget)
class Widget implements IWidget {
  public baseClass: string = 'map-meta-data';
  public config: IConfig;
  public descriptionElement : HTMLInputElement;
  public useconstraintsElement : HTMLInputElement;
  public linkElement: HTMLAnchorElement;
  public useconstraintsTitle : HTMLHeadingElement;
  public descriptionTitle : HTMLHeadingElement;

  private appConfig: any; 

  private postCreate(args: any): void {
    const self: any = this;
    self.inherited(arguments);
    console.log('MapMetaData::postCreate');
  }
  private startup(): void {
    let self: any = this;
    self.inherited(arguments);
    this.linkElement.style.visibility = "hidden";    
    //try to get the itemid of the map
    if (this.appConfig.map && this.appConfig.map.itemId){
      let portal = new Portal( this.appConfig.portalUrl);
      var params = {
        q:'(' + this.appConfig.map.itemId + ')', //query by id
        num:1
      };
      //try to get the map without credentials
      let found = false;
      portal.queryItems(params).forEach((mapItem : PortalItem) => {
        this.applyItemInfo(mapItem);
        found= true;
      });
      //in case we didn't find one, get credentials and try with a token
      if (!found){
        const im = (window as any).esri.id as IdentityManager;
        im.getCredential(this.appConfig.portalUrl).then((cred: Credential) => {
          params['token']= cred.token;
          portal.queryItems(params).forEach((mapItem : PortalItem) => {
            this.applyItemInfo(mapItem);
          });
        });
      }
    }
    else{
      this.descriptionElement.innerHTML = "could not find item description";
    }
    
  };
  private applyItemInfo(mapItem : PortalItem): void{
    //construct the url and set the link element visible
    const url =`${mapItem.portal.url}home/item.html?id=${mapItem.id}` 
    this.linkElement.href = url;
    this.linkElement.style.visibility = "visible"
    
    //set the description html when configured to be visible or disable the title 
    if (this.config.showDescription){
      this.descriptionElement.innerHTML = mapItem.description; 
    }
    else{
      this.descriptionTitle.style.display = 'none';
    }

    //set the use constraints html when configured to be visible or disable the title 
    if (this.config.showUseConstraints){
      this.useconstraintsElement.innerHTML = mapItem.licenseInfo;
    }
    else{
      this.useconstraintsTitle.style.display = 'none';
    }
  }
  // private onOpen(): void {
  //   console.log('MapMetaData::onOpen');
  // };
  // private onClose(): void {
  //   console.log('MapMetaData::onClose');
  // };
  // private onMinimize(): void {
  //   console.log('MapMetaData::onMinimize');
  // };
  // private onMaximize(): void {
  //   console.log('MapMetaData::onMaximize');
  // };
  // private onSignIn(credential): void {
  //   console.log('MapMetaData::onSignIn', credential);
  // };
  // private onSignOut(): void {
  //   console.log('MapMetaData::onSignOut');
  // };
  // private onPositionChange(): void {
  //   console.log('MapMetaData::onPositionChange');
  // };
  // private resize(): void {
  //   console.log('MapMetaData::resize');
  // };
}

export = Widget;

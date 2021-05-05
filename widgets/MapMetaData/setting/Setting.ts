// JIMU (WAB) imports:

/// <amd-dependency path="jimu/BaseWidgetSetting" name="BaseWidgetSetting" />
declare var BaseWidgetSetting: any; // there is no ts definition of BaseWidgetSetting (yet!)

// DeclareDecorator - to enable us to export this module with Dojo's "declare()" syntax so WAB can load it:
import declare from '../support/declareDecorator';

import IConfig from '../config';

interface ISetting {
  config?: IConfig;
}

@declare(BaseWidgetSetting)
class Setting implements ISetting {
  public baseClass: string = 'map-meta-data-setting';
  public config: IConfig;

  private showDescriptionTextNode: HTMLInputElement;
  private showUseConstraintsTextNode: HTMLInputElement;

  public postCreate(args: any): void {
    const self: any = this;
    self.inherited(arguments);
    this.setConfig(this.config);
  }

  public setConfig(config: IConfig): void {
    this.showDescriptionTextNode.checked = config.showDescription;
    this.showUseConstraintsTextNode.checked = config.showUseConstraints;
  }

  public getConfig(): IConfig {
    // WAB will get config object through this method
    return {
      showDescription: this.showDescriptionTextNode.checked,
      showUseConstraints: this.showUseConstraintsTextNode.checked
    };
  }
}

export = Setting;

define(['jquery', 'toastr', 'jquery.blockui'], function ($, toastr) {
  var globals = {
    constants: {
      failureTitle: 'Server Error',
      failureMessage: 'There has been a catastrophic error with:',
      validationTitle: 'Invalid',
      informationTitle: 'Information',
      validationMessage: 'Please correct the invalid fields before submitting',
      successTitle: 'Hurrah!',
      successMessage: 'Completed successfully :)',
      urls: {
        packTree: 'PackReportTree',
        packs: 'Pack',
        elmah: 'ElmahSearch',
        environments: 'Environment',
        attributes: 'Attribute',
        reports: 'Report',
        desktops: 'Desktop',
        apiRoutes: 'ApiRoute',
        userDetails: 'UserDetail',
        catalogueItemPackEnvironments: 'CatalogueItemPackEnvironment',
        entities: 'Entity',
        entityAttributesFlatList: 'EntityAttributesFlatList',
        entityAttributes: 'EntityAttribute',
        entityAssociations: 'EntityAssociation',
        attributeDataTypeLookup: 'AttributeDataTypeLookup',
        lookupVariableParameter: 'LookupVariableParameter',
        lookup: "lookup",
        actionPlanTaskTypes: "ActionPlanTaskType",
        catalogueItemPacks: 'CatalogueItemPack',
        packEnvironments: 'PackEnvironment',
        roles: 'Role',
        roleEntityAssociations: 'RoleEntityAssociation',
        roleEntities: 'RoleEntity',
        roleRouteApiAssociations: 'ApiRouteRoleAssociation',
        syncLocations: 'offlinesynclocation',
        syncAudits: 'offlinesyncaudit',
        offlineLocation: 'offlinelocation',
        tags: 'Tag',
        tagTree: 'TagTree',
        locations: 'Location',
        locationTree: 'LocationTree',
        locationTreeMoveChildren: 'LocationTreeMoveChildren',
        lookupGroups: 'LookupVariableParameter',
        lookupGroupTree: 'LookupGroupTree',
        dataType: "attributedatatypelookup",
        syncState: "SyncState"
      }
    },
    errorMessage: function (title, message) {
      var t = title || globals.constants.failureTitle;
      var m = message || globals.constants.failureMessage;
      toastr['error'](m, t);
    },
    validationMessage: function (title, message) {
      var t = title || globals.constants.validationTitle;
      var m = message || globals.constants.validationMessage;
      toastr['warning'](m, t);
    },
    infoMessage: function (title, message) {
      var t = title; // || globals.constants.informationTitle;
      var m = message;
      toastr.info(m, t);
    },
    successMessage: function (title, message) {
      var t = title || globals.constants.successTitle;
      var m = message || globals.constants.successMessage;
      toastr['success'](m, t);
    },

    blockUI: function(element) {
      if (element) {
        $(element).block({
            message: '<i class="fa fa-circle-o-notch fa-2x fa-spin fa-fw"></i>'
        });
      } else {
        $.blockUI({
            message: '<i class="fa fa-circle-o-notch fa-2x fa-spin"></i>'
        });
      }
    },
    unblockUI: function(element) {
      if (element) {
          $(element).unblock();
      } else {
          $.unblockUI();
      }
    }
  };

  // toastr global options
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "50",
    "hideDuration": "50",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };

  return globals;
});

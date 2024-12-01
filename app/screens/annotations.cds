using MyService as service from '../../srv/service';
annotate service.FilterScreen with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ID',
                Value : ID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ScreenName',
                Value : ScreenName,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataFieldForAction',
            Action : 'MyService.EntityContainer/getUser',
            Label:'get screens'
        },
        {
            $Type : 'UI.DataField',
            Label : 'ID',
            Value : ID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'ScreenName',
            Value : ScreenName,
        },
    ],
    UI.HeaderInfo:{
        TypeName:'Welcome Parimi Ramanaiah',
        TypeNamePlural:'Welcome Parimi Ramanaiah'
    }
);


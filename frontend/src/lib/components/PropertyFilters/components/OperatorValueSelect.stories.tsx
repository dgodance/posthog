import React from 'react'
import { ComponentMeta } from '@storybook/react'
import {
    OperatorValueSelect,
    OperatorValueSelectProps,
} from 'lib/components/PropertyFilters/components/OperatorValueSelect'
import { PropertyDefinition, PropertyType } from '~/types'

export default {
    title: 'Filters/PropertyFilters/OperatorValueSelect',
    Component: OperatorValueSelect,
} as ComponentMeta<typeof OperatorValueSelect>

const makePropertyDefinition = (name: string, propertyType: PropertyType | undefined): PropertyDefinition => ({
    id: name,
    name: name,
    property_type: propertyType,
    description: '',
    volume_30_day: null,
    query_usage_30_day: null,
})

const props = (type?: PropertyType | undefined): OperatorValueSelectProps => ({
    type: '',
    propkey: 'the_property',
    onChange: () => {},
    propertyDefinitions: [makePropertyDefinition('the_property', type)],
    defaultOpen: true,
})

export function OperatorValueWithStringProperty(): JSX.Element {
    return (
        <>
            <h1>String Property</h1>
            <OperatorValueSelect {...props(PropertyType.String)} />
        </>
    )
}

export function OperatorValueWithDateTimeProperty(): JSX.Element {
    return (
        <>
            <h1>Date Time Property</h1>
            <OperatorValueSelect {...props(PropertyType.DateTime)} />
        </>
    )
}

export function OperatorValueWithNumericProperty(): JSX.Element {
    return (
        <>
            <h1>Numeric Property</h1>
            <OperatorValueSelect {...props(PropertyType.Numeric)} />
        </>
    )
}

export function OperatorValueWithBooleanProperty(): JSX.Element {
    return (
        <>
            <h1>Boolean Property</h1>
            <OperatorValueSelect {...props(PropertyType.Boolean)} />
        </>
    )
}

export function OperatorValueWithSelectorProperty(): JSX.Element {
    return (
        <>
            <h1>CSS Selector Property</h1>
            <OperatorValueSelect {...props(PropertyType.Selector)} />
        </>
    )
}

export function OperatorValueWithUnknownProperty(): JSX.Element {
    return (
        <>
            <h1>Property without specific type</h1>
            <OperatorValueSelect {...props()} />
        </>
    )
}

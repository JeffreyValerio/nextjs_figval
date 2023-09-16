'use client'

import { useMemo, useRef, useState } from 'react'

import Link from 'next/link'
import delve from 'dlv'

import { createAutocomplete } from '@algolia/autocomplete-core'
import { strapiFetch } from '@/libs'

const AutocompleteItem = (item: any) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const image = delve(item, 'attributes.thumbnail.data.attributes.url');
    const imageName = delve(item, 'attributes.thumbnail.data.attributes.name');
    return (
        <li>
            <Link href={`/${item.attributes.slug}`} className='hover:bg-blue-300 flex gap-4 p-4 text-black'
                onBlur={handleBlur} // Manejador de evento onBlur
                onFocus={handleFocus} // Manejador de evento onFocus
            >
                <img src={image} alt={imageName} className='w-12 h-12 object-contain' />
                <div>
                    <h3 className='text-sm font-semibold'>{item.attributes.name}</h3>
                    <p className='text-xs text-gray-600'>{item.attributes.price}</p>
                </div>
            </Link>
        </li>
    )
}

const SearchEngine = (props: any) => {

    const [autocompleteState, setAutocompleteState] = useState({
        collections: [],
        isOpen: false
    })

    const autocomplete: any = useMemo(() => createAutocomplete({
        placeholder: 'Busca tu oferta',
        onStateChange: ({ state }: any) => setAutocompleteState(state),
        getSources: () => [{
            sourceId: 'figval',
            getItems: ({ query }) => {
                if (!!query) {
                    return strapiFetch(`/products?pagination[limit]=5&populate=*&filters[$or][0][name][$containsi]=${query}`, 'no-cache')
                }
            }
        }],
        ...props
    }), [props])

    const formRef = useRef(null)
    const inputRef = useRef(null)
    const panelRef = useRef(null)

    const formProps: any = autocomplete.getFormProps({
        inputElement: inputRef.current
    })
    const inputProps: any = autocomplete.getInputProps({
        inputElement: inputRef.current
    })

    return (
        <form ref={formRef} className="flex justify-center w-full sm:w-2/4" {...formProps}>
            <div className="flex relative w-full gap-2">
                <input ref={inputRef} className="flex-1 p-2 text-black" {...inputProps} />
                <div className="absolute mt-16 top-0 left-0 border border-gray-100 bg-white overflow-hidden rounded-lg shadow-lg z-10" ref={panelRef} {...autocomplete.getPanelProps()}>
                    {autocompleteState.collections.map((collection, index) => {
                        const { items }: any = collection
                        return (
                            <section key={`section-${index}`}>
                                {items.length > 0 && (
                                    <ul {...autocomplete.getListProps()}>
                                        {
                                            items[0].data.map((item: any) => <AutocompleteItem key={items.code} {...item} />)
                                        }
                                    </ul>
                                )}
                            </section>
                        )
                    })}
                </div>
                <button className="p-2 bg-turquoise">Buscar</button>
            </div>
        </form>
    )
}

export default SearchEngine  
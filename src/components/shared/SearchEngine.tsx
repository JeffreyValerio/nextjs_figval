'use client'

import { useMemo, useRef, useState } from 'react'

import Link from 'next/link'
import delve from 'dlv'

import { createAutocomplete } from '@algolia/autocomplete-core'
import { strapiFetch } from '@/libs'
import { AiOutlineSearch } from 'react-icons/ai'
import { format } from '@/utils'
import Image from 'next/image'

const AutocompleteItem = (item: any) => {

    const image = delve(item, 'attributes.thumbnail.data.attributes.url');
    const imageName = delve(item, 'attributes.thumbnail.data.attributes.name');

    if (!item) { return <></> }

    return (
        <li key={item.attributes.name}>
            <Link href={`/${item?.attributes?.slug}`} className='hover:bg-blue-300 flex items-center gap-4 p-4 text-black border-b border-b-[#ccc]'>
                <Image src={image} alt={imageName} className='w-12 h-full object-contain' width={100} height={100} />
                <div>
                    <h3 className='text-sm font-semibold'>{item.attributes.name}</h3>
                    <p className='text-xs text-gray-600'>{format(item.attributes.price)}</p>
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
        placeholder: 'Buscar producto',
        onStateChange: ({ state }: any) => setAutocompleteState(state),
        getSources: () => [{
            sourceId: 'figval',
            getItems: ({ query }) => {
                if (!!query) {
                    // return strapiFetch(`/products?pagination[limit]=5&populate=*&filters[$or][0][name][$containsi]=${query}`, 'no-cache')
                    return strapiFetch(`/products?pagination[limit]=5&populate=*&filters[name][$containsi]=${query}`, 'no-cache')
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
            <div className="py-2 sm:p-0 flex relative w-full gap-2">
                <input ref={inputRef} className="flex-1 p-2 text-black" {...inputProps} />

                <div className="absolute mt-12 top-0 left-0 bg-white overflow-hidden shadow-lg z-10" ref={panelRef} {...autocomplete.getPanelProps()}>
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
                <button type='submit' className="p-2 bg-turquoise"> <AiOutlineSearch className="w-5 h-5" /> </button>
            </div>
        </form>
    )
}

export default SearchEngine  
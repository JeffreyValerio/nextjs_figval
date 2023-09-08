'use client'

import React, { useState } from 'react'

import ReactMarkdown from 'react-markdown';
import { Tab } from '@headlessui/react'

import { Poppins } from 'next/font/google'
const poppins = Poppins({ subsets: ['devanagari'], weight: ['300', "700"] })

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const ProductTabs = ({ className, features, technical_sheet }: any) => {
    return (
        <div className={`w-full px-2 sm:px-0 pt-8 ${className || ''}`}>
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-turquoise p-1">
                    <Tab
                        className={({ selected }: any) =>
                            classNames(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400',
                                selected
                                    ? 'bg-white shadow'
                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                    >
                        Características
                    </Tab>
                    <Tab
                        disabled={technical_sheet ? false : true}
                        className={({ selected }: any) =>
                            classNames(`${technical_sheet ? '' : 'disabled'}
              w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700`,
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400',
                                selected
                                    ? 'bg-white shadow'
                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                    >
                        Ficha técnica
                    </Tab>
                    <Tab disabled
                        className={({ selected }: any) =>
                            classNames(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400',
                                selected
                                    ? 'bg-white shadow'
                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                    >
                        Reseñas
                    </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2">
                    <Tab.Panel
                        className={classNames(
                            'rounded-xl bg-white p-3',
                            'ring-white ring-opacity-60'
                        )}
                    >
                        <div className={`markdown text-md mb-5 mx-3 sm:mx-0 font-light ${poppins.className} `}>
                            <ReactMarkdown>{features}</ReactMarkdown>
                        </div>
                    </Tab.Panel>

                    <Tab.Panel
                        className={classNames(
                            'rounded-xl bg-white p-3',
                            'ring-white ring-opacity-60'
                        )}
                    >
                        {/* FEATURES */}
                        <div className={`markdown text-md mb-5 mx-3 sm:mx-0 font-light ${poppins.className} `}>
                            <ReactMarkdown >{technical_sheet}</ReactMarkdown>
                        </div>

                    </Tab.Panel>

                    <Tab.Panel
                        className={classNames(
                            'rounded-xl bg-white p-3',
                            'ring-white ring-opacity-60'
                        )}
                    >
                        RESEÑAS
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default ProductTabs 
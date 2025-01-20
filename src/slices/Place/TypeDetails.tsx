import { Content } from '@prismicio/client'
import React, { forwardRef } from 'react'
import { PlaceSliceDefaultPrimaryPlacesItem, Simplify } from '../../../prismicio-types'
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import clsx from 'clsx'

export default function TypeDetails({ ref, items }: { ref?: React.Ref<HTMLDivElement>, items: Simplify<PlaceSliceDefaultPrimaryPlacesItem>[] }) {
    return (
        <div className="mt-10 grid" ref={ref}>
            <div className="grid grid-cols-4 gap-4 font-content text-sm">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={clsx(
                            "grid-rows-[auto_1fr] aspect-w-4 aspect-h-3",
                            index % 2 === 1 ? "col-span-2" : "col-span-1"
                        )}
                    >
                        <div className="border-[1px] border-black grid grid-cols-subgrid gap-4 h-full align-top">
                            {index % 2 === 1 && (
                                <div className="row-start-1 h-full">
                                    <PrismicNextImage field={item.picture} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className={clsx("p-4 relative h-full", index % 2 === 1 ? "row-start-2" : "row-start-1")}>
                                <a href={item.link ?? "#"} target="_blank">
                                    <h2 className="uppercase text-black font-5xl font-bold">{item.name}</h2>
                                </a>
                                <p className="italic pt-2 pb-2">
                                    <a target="_blank" href={"https://www.google.com/maps/place/" + item.location.latitude + "," + item.location.longitude} >{item.address}</a>
                                </p>
                                <PrismicRichText field={item.description} />
                            </div>
                        </div>
                    </div>


                ))}
            </div>
        </div>
    )
}

import { ScreenSize, useOnboard, useScreenSize } from '@pooltogether/hooks'
import { getNetworkNiceNameByChainId } from '@pooltogether/utilities'
import React from 'react'
import classnames from 'classnames'
import { networkTextColorClassname } from '../../../utils/networkColorClassnames'
import { NetworkIcon } from '../../Icons/NetworkIcon'

export const NetworkTrigger = (props) => {
  const { openModal, className } = props
  const { network: walletChainId } = useOnboard()
  const screenSize = useScreenSize()

  const networkName = getNetworkNiceNameByChainId(walletChainId)

  if (screenSize <= ScreenSize.sm) {
    return (
      <NetworkIcon
        onClick={openModal}
        className={className}
        sizeClassName='h-6 w-6'
        chainId={walletChainId}
      />
    )
  }

  return (
    <button
      onClick={openModal}
      className={classnames(
        'tracking-wide flex items-center capitalize trans trans-fast font-bold',
        'bg-default hover:bg-body hover:text-inverse border border-accent-4 hover:border-primary',
        'text-xxs sm:text-xs xs:px-4 py-1 rounded-full',
        `text-${networkTextColorClassname(walletChainId)}`,
        className
      )}
    >
      <NetworkIcon className='' sizeClassName='h-6 w-6 mr-2' chainId={walletChainId} />
      <span className='capitalize hidden xs:block'>{networkName}</span>
    </button>
  )
}

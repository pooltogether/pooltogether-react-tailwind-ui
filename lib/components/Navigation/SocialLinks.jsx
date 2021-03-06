import React, { useState } from 'react'
import classnames from 'classnames'
import FeatherIcon from 'feather-icons-react'

import { Accordion } from '../Accordion'

import KnowledgeBaseIcon from '../../assets/Socials/knowledge-base.svg'
import DocsIcon from '../../assets/Socials/docs.svg'
import GovForumIcon from '../../assets/Socials/gov-forum.svg'
import TreasuryIcon from '../../assets/Socials/treasury.svg'

import MediumLogo from '../../assets/Socials/medium-logo.svg'
import DiscordLogo from '../../assets/Socials/discord-logo.svg'
import TwitterLogo from '../../assets/Socials/twitter-logo.svg'

const sharedClasses =
  'relative leading-none w-full flex justify-start items-center text-accent-4 hover:text-highlight-2 py-2 px-6 trans outline-none focus:outline-none active:outline-none mb-1 ml-3 lg:ml-0 h-10'

const headerClasses = 'text-lg font-bold'

const childClasses = 'text-xs'

const socialsLinkData = [
  {
    headerLabel: 'ecosystem',
    childLinks: [
      {
        href: 'https://www.notion.so/PoolTogether-Knowledge-Base-fa721ccefa3242eaabd125a8415acd27',
        label: 'Knowledge Base',
        icon: <img src={KnowledgeBaseIcon} className='w-4 opacity-50 mx-auto' />
      },
      {
        href: 'https://docs.pooltogether.com/',
        label: 'Documentation',
        icon: <img src={DocsIcon} className='w-3 opacity-50 mx-auto' />
      },
      {
        href: 'https://gov.pooltogether.com/',
        label: 'Governance forum',
        icon: <img src={GovForumIcon} className='w-4 opacity-50 mx-auto' />
      },
      {
        href: 'https://info.pooltogether.com/',
        label: 'Treasury',
        icon: <img src={TreasuryIcon} className='w-4 opacity-50 mx-auto' />
      }
    ]
  },
  {
    headerLabel: 'socials',
    childLinks: [
      {
        href: 'https://twitter.com/PoolTogether_',
        label: 'Twitter',
        icon: <img src={TwitterLogo} className='w-4 opacity-50 mx-auto' />
      },
      {
        href: 'https://discord.gg/hxPhPDW',
        label: 'Discord',
        icon: <img src={DiscordLogo} className='w-4 opacity-50 mx-auto hover:opacity-100 trans' />
      },
      {
        href: 'https://medium.com/pooltogether',
        label: 'Medium',
        icon: <img src={MediumLogo} className='w-4 opacity-50 mx-auto hover:opacity-100 trans' />
      }
    ]
  }
]

export const SocialLinks = (props) => {
  const [expanded, setExpanded] = useState()

  return (
    <>
      {socialsLinkData.map((linkData, index) => {
        return (
          <SocialLinkSet
            key={`social-link-set-${index}`}
            index={index}
            linkData={linkData}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        )
      })}
    </>
  )
}

const SocialLinkSet = (props) => {
  const { linkData } = props

  const content = linkData.childLinks.map((childLink, index) => {
    return (
      <SocialLinkChild
        key={`social-link-child-${index}`}
        href={childLink.href}
        label={childLink.label}
        icon={childLink.icon}
      />
    )
  })

  return <SocialLinkHeader {...props}>{content}</SocialLinkHeader>
}

const SocialLinkHeader = (props) => {
  return (
    <Accordion
      openUpwards
      key={`social-link-${props.index}`}
      i={props.index}
      expanded={props.expanded}
      setExpanded={props.setExpanded}
      content={props.children}
      header={
        <a className={classnames(sharedClasses, headerClasses)}>
          <FeatherIcon
            icon='chevron-up'
            strokeWidth='0.25rem'
            className={classnames('w-4 h-4 stroke-current trans', {
              'rotate-180': props.expanded === props.index
            })}
          />
          <span className='pl-3 capitalize'>{props.linkData.headerLabel}</span>
        </a>
      }
    />
  )
}

const SocialLinkChild = (props) => {
  return (
    <div>
      <a
        href={props.href}
        target={props.target}
        className={classnames(sharedClasses, childClasses)}
      >
        <span className='w-4'>{props.icon}</span>
        <span className='pl-3 capitalize'>{props.label}</span>
      </a>
    </div>
  )
}

SocialLinkChild.defaultProps = {
  target: '_blank'
}

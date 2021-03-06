import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { useUsersAddress } from '@pooltogether/hooks'

const { getProfile } = require('3box/lib/api')

const isValidImage = (image) => {
  if (image && image[0] && image[0].contentUrl) {
    return true
  }

  return false
}

export function ProfileAvatar(props) {
  const { className } = props

  const [profile, setProfile] = useState()

  const usersAddress = useUsersAddress()

  const diameter = 16

  useEffect(() => {
    const get3BoxProfile = async () => {
      const boxProfile = await getProfile(usersAddress)
      setProfile(boxProfile)
    }

    if (usersAddress) {
      get3BoxProfile()
    }
  }, [usersAddress])

  if (!usersAddress) {
    return null
  }

  const image =
    profile && isValidImage(profile.image) ? (
      <img
        alt='profile avatar'
        src={`https://ipfs.infura.io/ipfs/${profile.image[0].contentUrl['/']}`}
        className={classnames('profile-img relative inline-block rounded-full w-5 h-5', className)}
      />
    ) : (
      <div
        className={classnames(
          'profile-img profile-img--jazzicon relative inline-flex justify-center flex-col',
          className
        )}
      >
        <Jazzicon diameter={diameter} seed={jsNumberForAddress(usersAddress)} />
      </div>
    )

  return image
}

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import { Lightbox } from 'react-modal-image'

import tagStatus from '../../../../constants/tagData'
import ChangeStatus from './ChangeStatus'
import DetailPart from './DetailPart'
import { useMissionValue } from '../../../../utils/contexts/MissionContext'
import { useTagValue } from '../../../../utils/contexts/TagContext'
import { useUserValue } from '../../../../utils/contexts/UserContext'
import CustomDrawer from '../../../../components/CustomDrawer'
import { useViewCount } from '../../../../utils/hooks/useViewCount'

function TagDetailDialog(props) {
  const { activeTag, onClose, tagDetail, ...rest } = props
  const { isInMission } = useMissionValue()
  const { threshold, fetchTagDetail } = useTagValue()
  const { isGuest } = useUserValue()
  const [largeImg, setLargeImg] = useState(null)
  const [stateDrawer, setStateDrawer] = useState(false)
  const { incrementViewCount } = useViewCount()

  useEffect(() => {
    if (!isGuest) {
      incrementViewCount(activeTag.id)
    }
  }, [incrementViewCount, activeTag, isGuest])
  useEffect(() => {
    fetchTagDetail()
  }, [fetchTagDetail])
  console.log('tagDetail', tagDetail)

  return (
    <>
      <CustomDrawer
        open={activeTag && !isInMission}
        handleClose={onClose}
        height='part'
        variant='persistent'
        closeButton={false}
        title={`${tagDetail.category.categoryType}/${tagDetail.category.categoryName}`}
      >
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
          flexGrow={1}
        >
          <DetailPart
            tagDetail={tagDetail}
            setLargeImg={setLargeImg}
            setStateDrawer={setStateDrawer}
            threshold={threshold}
          />
        </Box>
      </CustomDrawer>
      {tagDetail.id && (
        <ChangeStatus
          stateDrawer={stateDrawer}
          tagDetail={tagDetail}
          setStateDrawer={setStateDrawer}
          status={(() => tagStatus[0])()}
        />
      )}
      {largeImg && (
        <Lightbox
          large={largeImg}
          onClose={() => setLargeImg(null)}
          hideDownload
          hideZoom
        />
      )}
    </>
  )
}

TagDetailDialog.propTypes = {
  activeTag: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  tagDetail: PropTypes.object.isRequired
}
TagDetailDialog.defaultProps = {
  activeTag: null
}

export default TagDetailDialog

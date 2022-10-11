import React from 'react'
import Icon from '../layout/Icon'

export interface EmptyStateProps {
  title: string
  subtitle: string
  iconName?: string
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle, iconName = 'person' }) => {
  return (
    <div className="empty float-center">
      <div className="empty-icon">
        <Icon icon={iconName} className="h1" />
      </div>
      <p className="empty-title h5">{title}</p>
      <p className="empty-subtitle">{subtitle}</p>
    </div>
  )
}

export default EmptyState

import { Injectable } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private notification: NzNotificationService) {}

  dialogList = {
    login: {
      success: 'Welcome to Kampong',
      error: 'Login failed, please try again',
    },
    logout: {
      success: 'Logged out',
      error: 'Logout failed, please try again',
    },
    register: {
      success: 'Please verify your email',
      error: 'Register failed, please try again',
    },
    email_verified: {
      success: 'Your account has been activated',
      error: 'Email verification failed, please try again',
    },
    upload_comments: {
      success: 'Comment posted successfully',
      error: 'Comment failed to post',
    },
    delete_comments: {
      success: 'Comment deleted',
      error: 'Failed to delete Comment',
    },
    upload_updates: {
      success: 'Update posted successfully',
      error: 'Update failed to post',
    },
    delete_updates: {
      success: 'Update deleted',
      error: 'Failed to delete Update',
    },
    like_listing: {
      liked: 'Added to your Likes',
      unliked: 'Removed from your Likes',
      error: 'Error, please try again later',
      unauthorized: 'Please login to like',
    },
    create_organisation: {
      success: 'Organisation Successfully Created',
      error: 'Error, please try again later',
    },
    create_programme: {
      success: 'Programme Successfully Created',
      error: 'Error in creating programme',
    },
    create_listing: {
      success: 'Initiative Successfully Created',
      error: 'Error, please try again later',
    },
    update_listing: {
      success: 'Initiative Successfully Updated',
      error: 'Error, please try again later',
    },
    delete_listing: {
      success: 'Initiative Successfully Deleted',
      error: 'Error, please try again later',
    },
    update_profile: {
      success: 'Profile Successfully Updated',
      error: 'Error, please try again later',
    },
    setup_profile: {
      success: 'Profile Setup Complete ',
      error: 'Error, please try again later',
      validation_error: 'Please complete the setup',
    },
    send_message: {
      success: 'Your message has been sent!',
      error: 'Failed to send message',
    },
    send_application: {
      success: 'Your job application has been sent!',
      error: 'There is something wrong. Please try again later! ',
    },
    verify: {
      msg: 'PLease verify your email',
    },
    generic_error: {
      error: 'Error, please try again later',
    },
  };

  openNotification(message: string, success: boolean) {
    if (success) {
      this.notification.success('Success!', message).onClick.subscribe(() => {});
    } else {
      this.notification.error('Error:', message).onClick.subscribe(() => {});
    }
  }
}

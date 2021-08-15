package com.projectmanager.service.service_impl;

//import com.projectmanager.common.CustomUserDetails;
import com.projectmanager.entity.User;
import com.projectmanager.repository.UserRepository;
import com.projectmanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> u = userRepository.findByUsernameAndDeleteIsFalse(username);
        if(!u.isPresent()) {
            throw new UsernameNotFoundException("User not found for username: " + username);
        }
        //return new CustomUserDetails(u);

        Set<GrantedAuthority> authorities = new HashSet<>();

        if(u.get().getAdmin()){
            System.out.println("admin");
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }else {
            System.out.println("user");
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        }

       return new org.springframework.security.core.userdetails.User(u.get().getUsername(),
                u.get().getEncryptedPassword(), authorities);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsernameAndDeleteIsFalse(username);
    }

    @Override
    public Page<User> findByCreateUser(Integer id, Pageable pageable) {
        return userRepository.findByCreateUserAndDeleteIsFalse(id, pageable);
    }


    @Override
    public Page<User> getAll(Pageable pageable) {
        return userRepository.findAllByDeleteIsFalse(pageable);
    }

    @Override
    public Optional<User> findById(Integer id) {
        return userRepository.findByIdAndDeleteIsFalse(id);
    }

    @Override
    public User create(User u) {
        Optional<User> user = userRepository.findByUsernameAndDeleteIsFalse(u.getUsername());
        //System.out.println(user);
        if(!user.isPresent()) {
            u.setEncryptedPassword(bCryptPasswordEncoder.encode(u.getPassword()));
            u.setAdmin(false);
            u.setDelete(false);
            u.setCreateDate(Date.valueOf(LocalDate.now()));
            return userRepository.save(u);
        }
        return null;
    }

    @Override
    public boolean update(User u) {
        Optional<User> user = userRepository.findByUsernameAndDeleteIsFalse(u.getUsername());
        if(!user.isPresent()) {
            return false;
        }else {
            user.get().setAddress(u.getAddress());
            user.get().setEmail(u.getEmail());
            user.get().setPhone(u.getPhone());
        }
        userRepository.save(user.get());
        return true;
    }

    @Override
    public boolean delete(Integer id) {
        Optional<User> user = userRepository.findById(Math.toIntExact(id));
        if(!user.isPresent()) {
            return false;
        }else {
            user.get().setDelete(true);
            userRepository.save(user.get());
        }
        return true;
    }

}
